/* eslint-disable */
import Remarkable from "remarkable";
import prism from "./prism";

let parser = new Remarkable({
  html: true
});

function parse(md, options) {
  let tokens = parser.parse(md, {});

  // markdwon渲染列表
  let renderList: any[] = [];

  let env: any[] = [];
  // 记录当前list深度
  let listLevel = 0;
  // 记录第N级ol的顺序
  let orderNum = [0, 0];
  let tmp;

  // 获取inline内容
  let getInlineContent = function(inlineToken) {
    let ret: any[] = [];
    let env;
    let tokenData = {};

    if (inlineToken.type === "htmlblock") {
      let videoRegExp = /<video.*?src\s*=\s*['"]*([^\s^'^"]+).*?(poster\s*=\s*['"]*([^\s^'^"]+).*?)?(?:\/\s*>|<\/video>)/g;
      let match;
      let html = inlineToken.content.replace(/\n/g, "");
      while ((match = videoRegExp.exec(html))) {
        if (match[1]) {
          let retParam: any = {
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
              content: token.content,
              data: tokenData
            });
            env = "";
            tokenData = {};
          } else if (token.type === "del_open") {
            env = "deleted";
          } else if (token.type === "hardbreak") {
            ret.push({
              type: "text",
              content: "\n"
            });
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

  let getBlockContent = function(blockToken, index, firstInLi) {
    if (blockToken.type === "htmlblock") {
      return getInlineContent(blockToken);
    }
    if (blockToken.type === "heading_open") {
      return {
        type: "h" + blockToken.hLevel,
        content: getInlineContent(tokens[index + 1])
      };
    }
    if (blockToken.type === "paragraph_open") {
      let prefix = "";
      if (env.length) {
        prefix = env.join("_") + "_";
      }
      var content = getInlineContent(tokens[index + 1]);

      if (env[env.length - 1] === "li" && env[env.length - 2] === "ol") {
        let prefix = "　";
        if (firstInLi) {
          prefix = orderNum[listLevel - 1] + ". ";
        }
        content.unshift({
          type: "text",
          content: prefix
        });
      }

      return {
        type: prefix + "p",
        content: content
      };
    }
    if (blockToken.type === "fence" || blockToken.type === "code") {
      content = blockToken.content;
      let highlight = false;
      if (
        options.highlight &&
        blockToken.params &&
        prism.languages[blockToken.params]
      ) {
        content = prism.tokenize(content, prism.languages[blockToken.params]);
        highlight = true;
      }
      if (blockToken.params === "html") {
        const flattenTokens = (
          tokensArr,
          result: any = [],
          parentType = ""
        ) => {
          if (tokensArr.constructor === Array) {
            tokensArr.forEach(el => {
              if (typeof el === "object") {
                el.type = parentType + " wemark_inline_code_" + el.type;
                flattenTokens(el.content, result, el.type);
              } else {
                const obj: any = {};
                obj.type = parentType + " wemark_inline_code_";
                obj.content = el;
                result.push(obj);
              }
            });
            return result;
          } else {
            result.push(tokensArr);
            return result;
          }
        };
        content = flattenTokens(content);
      }
      return {
        type: "code",
        highlight: highlight,
        content: content
      };
    }
    if (blockToken.type === "bullet_list_open") {
      env.push("ul");
      listLevel++;
    }
    if (blockToken.type === "ordered_list_open") {
      env.push("ol");
      listLevel++;
    }
    if (blockToken.type === "list_item_open") {
      env.push("li");
      if (env[env.length - 2] === "ol") {
        orderNum[listLevel - 1]++;
      }
    }
    if (blockToken.type === "list_item_close") {
      env.pop();
    }
    if (blockToken.type === "bullet_list_close") {
      env.pop();
      listLevel--;
    }
    if (blockToken.type === "ordered_list_close") {
      env.pop();
      listLevel--;
      orderNum[listLevel] = 0;
    }
    if (blockToken.type === "blockquote_open") {
      env.push("blockquote");
    }
    if (blockToken.type === "blockquote_close") {
      env.pop();
    }
    if (blockToken.type === "tr_open") {
      tmp = {
        type: "table_tr",
        content: []
      };
      return tmp;
    }
    if (blockToken.type === "th_open") {
      tmp.content.push({
        type: "table_th",
        content: getInlineContent(tokens[index + 1])
          .map(function(inline) {
            return inline.content;
          })
          .join("")
      });
    }
    if (blockToken.type === "td_open") {
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
    let firstInLi = false;
    if (
      token.type === "paragraph_open" &&
      tokens[index - 1] &&
      tokens[index - 1].type === "list_item_open"
    ) {
      firstInLi = true;
    }
    let blockContent = getBlockContent(token, index, firstInLi);
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
  return renderList;
}

export { parse };
