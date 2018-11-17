const parser = require('./parser');
const getRichTextNodes = require('./richtext').getRichTextNodes;

Component({
  properties: {
    md: {
      type: String,
      value: '',
      observer() {
        this.parseMd();
      }
    },
    type: {
      type: String,
      value: 'wemark'
    },
    link: {
      type: Boolean,
      value: false
    },
    highlight: {
      type: Boolean,
      value: false
    }
  },
  data: {
    parsedData: {},
    richTextNodes: []
  },
  methods: {
    parseMd() {
      if (this.data.md) {
        let parsedData = parser.parse(this.data.md, {
          link: this.data.link,
          highlight: this.data.highlight
        });
        if (this.data.type === 'wemark') {
          this.setData({
            parsedData
          });
        } else {
          let richTextNodes = getRichTextNodes(parsedData);
          this.setData({
            richTextNodes
          });
        }
      }
    }
  }
});
