/* eslint-disable */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Video } from "@tarojs/components";
import "./index.scss";
import Remarkable from "remarkable";

let parser = new Remarkable({
  html: true
});

export default class TaroWemark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderList: []
    };

    this.parse = this.parse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.md) return false;

    let renderList = this.parse(nextProps.md);

    this.setState({
      renderList
    });
  }

  parse(md, options) {
    if (!options) options = {};
    if (!options.name) options.name = "wemark";

    let tokens = parser.parse(md, {});

    // markdwon渲染列表
    let renderList = [];
    // 图片高度数组
    let imageHeight = {};
    // 返回的数据
    let ret = {
      renderList: renderList,
      imageHeight: imageHeight
    };

    let env = [];
    // 记录当前list深度
    let listLevel = 0;
    // 记录第N级ol的顺序
    let orderNum = [0, 0];
    let tmp;

    // 获取inline内容
    let getInlineContent = function(inlineToken) {
      let ret = [];
      let env;

      if (inlineToken.type === "htmlblock") {
        // 匹配video
        // 兼容video[src]和video > source[src]
        let videoRegExp = /<video.*?src\s*=\s*['"]*([^\s^'^"]+).*?(poster\s*=\s*['"]*([^\s^'^"]+).*?)?(?:\/\s*\>|<\/video\>)/g;

        let match;
        let html = inlineToken.content.replace(/\n/g, "");
        while ((match = videoRegExp.exec(html))) {
          if (match[1]) {
            let retParam = {
              type: "video",
              src: match[1]
            };

            if (match[3]) {
              retParam.poster = match[3];
            }

            ret.push(retParam);
          }
        }
      } else {
        inlineToken.children &&
          inlineToken.children.forEach(function(token, index) {
            if (["text", "code"].indexOf(token.type) > -1) {
              ret.push({
                type: env || token.type,
                content: token.content
              });
              env = "";
            } else if (token.type === "del_open") {
              env = "deleted";
            } else if (token.type === "strong_open") {
              env = "strong";
            } else if (token.type === "em_open") {
              env = "em";
            } else if (token.type === "image") {
              ret.push({
                type: token.type,
                src: token.src
              });
            }
          });
      }

      return ret;
    };

    let getBlockContent = function(blockToken, index) {
      if (blockToken.type === "htmlblock") {
        return getInlineContent(blockToken);
      } else if (blockToken.type === "heading_open") {
        return {
          type: "h" + blockToken.hLevel,
          content: getInlineContent(tokens[index + 1])
        };
      } else if (blockToken.type === "paragraph_open") {
        let type = "p";
        let prefix = "";
        if (env.length) {
          prefix = env.join("_") + "_";
        }

        let content = getInlineContent(tokens[index + 1]);

        // 处理ol前的数字
        if (env[env.length - 1] === "li" && env[env.length - 2] === "ol") {
          content.unshift({
            type: "text",
            content: orderNum[listLevel - 1] + ". "
          });
        }

        return {
          type: prefix + "p",
          content: content
        };
      } else if (blockToken.type === "fence") {
        return {
          type: "code",
          content: blockToken.content
        };
      } else if (blockToken.type === "code") {
        return {
          type: "code",
          content: blockToken.content
        };
      } else if (blockToken.type === "bullet_list_open") {
        env.push("ul");
        listLevel++;
      } else if (blockToken.type === "ordered_list_open") {
        env.push("ol");
        listLevel++;
      } else if (blockToken.type === "list_item_open") {
        env.push("li");
        if (env[env.length - 2] === "ol") {
          orderNum[listLevel - 1]++;
        }
      } else if (blockToken.type === "list_item_close") {
        env.pop();
      } else if (blockToken.type === "bullet_list_close") {
        env.pop();
        listLevel--;
      } else if (blockToken.type === "ordered_list_close") {
        env.pop();
        listLevel--;
        orderNum[listLevel] = 0;
      } else if (blockToken.type === "blockquote_open") {
        env.push("blockquote");
      } else if (blockToken.type === "blockquote_close") {
        env.pop();
      } else if (blockToken.type === "tr_open") {
        tmp = {
          type: "table_tr",
          content: []
        };
        return tmp;
      } else if (blockToken.type === "th_open") {
        tmp.content.push({
          type: "table_th",
          content: getInlineContent(tokens[index + 1])
            .map(function(inline) {
              return inline.content;
            })
            .join("")
        });
      } else if (blockToken.type === "td_open") {
        tmp.content.push({
          type: "table_td",
          content: getInlineContent(tokens[index + 1])
            .map(function(inline) {
              return inline.content;
            })
            .join("")
        });
      }
    };

    tokens.forEach(function(token, index) {
      let blockContent = getBlockContent(token, index);
      if (!blockContent) return;
      if (!Array.isArray(blockContent)) {
        blockContent = [blockContent];
      }
      blockContent.forEach(function(block) {
        if (Array.isArray(block.content)) {
          block.isArray = true;
        } else {
          block.isArray = false;
        }
        renderList.push(block);
      });
    });

    let obj = {};
    obj[options.name] = ret;

    return renderList;
  }

  render() {
    return (
      <View class="wemark_wrapper">
        {this.state.renderList.length > 0 &&
          this.state.renderList.map(renderBlock => (
            <View
              className={"wemark_block_" + renderBlock.type}
              key={renderBlock.blockIndex}
            >
              {renderBlock.isArray &&
                renderBlock.content.map(renderInline => (
                  <block key={renderInline.inlineIndex}>
                    {renderInline.type !== "image" ? (
                      <Text className={"wemark_inline_" + renderInline.type}>
                        {renderInline.content}
                      </Text>
                    ) : (
                      <Image
                        mode="widthFix"
                        className="wemark_inline_image"
                        src={renderInline.src}
                      />
                    )}
                  </block>
                ))}
              {!renderBlock.isArray &&
                renderBlock.type === "code" && (
                  <View>{renderBlock.content}</View>
                )}
              {!renderBlock.isArray &&
                renderBlock.type === "video" && (
                  <Video
                    className="wemark_block_video"
                    src={renderBlock.src}
                    poster={renderBlock.poster}
                    controls
                  />
                )}
            </View>
          ))}
      </View>
    );
  }
}
