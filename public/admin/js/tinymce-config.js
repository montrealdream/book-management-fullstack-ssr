tinymce.init({
    selector: '.textarea-tinymce',
    license_key: 'gpl',
    plugins: 'quickbars emoticons lists',
    toolbar: 'undo redo | bold italic | alignleft aligncentre alignright alignjustify  | bullist numlist | quickimage | emoticons ',
    
    // chiều dài và chiều rộng của editor
    height: '300px',

    // content_css: '../css/style.css',
    // content_css_cors: true,
    skin: "oxide-dark",
    content_style: `
        tox tox-tinymce {
            border: none;
        }

        .mce-content-body {
            outline: none;
            background-color: #1E293B;
            color: #94A3B8;
        }

        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
            color: #757575;
        }
    `,
});