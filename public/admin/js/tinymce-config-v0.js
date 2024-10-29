// Đoạn code mang tính chất tham khảo
tinymce.init({
    selector: '.textarea-tinymce', // class cho thẻ sử dụng tinymce
    license_key: 'gpl',
    plugins: 'image emoticons insertdatetime',
    toolbar: 'undo redo | image | emoticons | insertdatetime',

    // nội dung nền
    placeholder: "Mô tả sản phẩm...", 
    
    
    // chèn ảnh thông qua browser máy tính
    automatic_uploads: true,
    file_picker_types: 'image',
    /* and here's our custom image picker*/
    file_picker_callback: (cb, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];

            const reader = new FileReader();
            reader.addEventListener('load', () => {
                /*
                Note: Now we need to register the blob in TinyMCEs image blob
                registry. In the next release this part hopefully won't be
                necessary, as we are looking to handle it internally.
                */
                const id = 'blobid' + (new Date()).getTime();
                const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
    
                    /* call the callback and populate the Title field with the file name */
                    cb(blobInfo.blobUri(), { title: file.name });
            });

            reader.readAsDataURL(file);
        });
        input.click();
    },

    // tìm kiếm icon theo từ
    emoticons_append: {
        custom_mind_explode: {
          keywords: [ 'brain', 'mind', 'explode', 'blown' ],
          char: '🤯'
        }
    },
    
    // dark mode
    skin: "oxide-dark", // thanh công cụ
    // skin: "naked",
    // skin: "outside",
    // content_css: "dark",

    height: '300px',// chiều cao

    // css cho khung content
    content_style: `
        .tox-tinymce {
            border: 1px solid #324055;
        }

        body {
            outline: none;
            background-color: #1E293B;
            color: #94A3B8;
        }

        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: #757575;
            content: attr(data-mce-placeholder);
            position: absolute;
        }
    `,
});