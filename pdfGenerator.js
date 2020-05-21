var app = new Vue({
    el: '#pdf-generator',
    data: {
        message: 'Hello Vue PDF Generator!',
        editor: null,
        blockManager: null,
        cssComposer: null,
        domComponents: null
    },
    mounted: function () {
        this.setUpEditor();
    },
    methods: {
        setUpEditor: function () {
            this.editor = grapesjs.init({
                // Indicate where to init the editor. You can also pass an HTMLElement
                container: '#gjs',
                // Get the content for the canvas directly from the element
                // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
                fromElement: true,
                // Size of the editor
                height: '500px',
                width: 'auto',
                // Disable the storage manager for the moment
                storageManager: false,
                // Avoid any default panel
                // panels: { defaults: [] },
            })

            // Set up managers
            this.blockManager = this.editor.BlockManager;
            this.cssComposer = this.editor.CssComposer;
            this.domComponents = this.editor.DomComponents;
            // set up CSS rules
            this.setCSSRules();

            // set up content blocks
            this.setBlocks();

        },
        setCSSRules: function () {
            this.cssComposer.setRule('.placeholder-data', { 
                'text-decoration': 'underline',
                'font-weight': 'bold'
            });
            this.cssComposer.setRule('.row', {
                display: 'flex',
                'justify-content': 'flex-start',
                'align-items': 'stretch',
                'flex-wrap': 'nowrap',
                padding: '10px',
                'min-height': '75px'
            })
            this.cssComposer.setRule('.row-cell', {
                'flex-grow': 1,
                'flex-basis': '100%',
                padding: '5px'
            })
            this.cssComposer.setRule('.content-container', {
                'min-height': '75px'
            })
            this.cssComposer.setRule('.textBlock', {
                display: 'inline-block'
            })
        },
        setBlocks: function () {

            this.blockManager.add('container', {
                label: 'Container',
                category: 'Basic',
                content: '<div class="content-container"></div>'
            });
            // 'my-first-block' is the ID of the block
            this.blockManager.add('text', {
                label: 'Text Block',
                category: 'Basic',
                content: '<p class="textBlock">This is a simple block</p>',
            });

            // 'my-first-block' is the ID of the block
            this.blockManager.add('registrant-name-block', {
                label: 'Registrant Name',
                category: 'Registrant Details',
                content: '<span class="placeholder-data" data-field="regname">[Registrant Name]</span>',
            });

            // 'my-first-block' is the ID of the block
            this.blockManager.add('registrant-due-block', {
                label: 'Total Due Block',
                category: 'Registrant Details',
                content: '<label class="placeholder-data" data-field="due">[Registrant Total Due]</label>'
            });

            this.blockManager.add('two-row-block', {
                label: '2 Columns',
                category: 'Basic',
                content: `
                  <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                      <div class="row-cell" data-gjs-draggable=".row"></div>
                  </div>
              `,
            })
            
            this.editor.DomComponents.addType('registrant-details', {
                // Model definition
                model: {
                  // Default properties
                  editable: false,
                  defaults: {
                    tagName: 'div',
                    attributes: { 'data-gjs-editable': 'false' },
                    draggable: true,
                    components: [{
                      type: 'text',
                      content: 'Hello wdsforld!!!'
                    }]
                  }
                }
            });

              this.blockManager.add('test-div', {
                label: 'Test Div',
                category: 'Basic',
                content: {
                    type: 'registrant-details'
                },
            })
            
            this.blockManager.render()
        },
        exportPDF: function() {
            this.$http.post('http://localhost:9938/generatePDF', {
                html: this.editor.getHtml(),
                css: this.editor.getCss()
            }, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            })
            .then(function(response) {
                let blob = new Blob([response.data], { type:   'application/pdf' } );
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'test.pdf';
                link.click();
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
  })