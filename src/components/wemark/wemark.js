const parser = require('./parser');

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
          link: false,
          highlight: this.data.highlight
        });
        this.setData({
          parsedData
        });
      }
    }
  }
});
