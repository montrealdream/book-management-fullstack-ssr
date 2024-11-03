tinymce.init({
    selector: '.textarea-tinymce',
    license_key: 'gpl',
    plugins: 'quickbars emoticons lists',
    toolbar: 'undo redo | bold italic | alignleft aligncentre alignright alignjustify  | bullist numlist | quickimage | emoticons ',
    
    content_css: '../css/style.css',

    // chiều dài và chiều rộng của editor
    height: '300px'
});