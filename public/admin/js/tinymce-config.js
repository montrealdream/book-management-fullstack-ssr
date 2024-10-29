tinymce.init({
    selector: '.textarea-tinymce',
    plugins: 'quickbars emoticons lists ',
    toolbar: 'undo redo | bold italic | alignleft aligncentre alignright alignjustify  | bullist numlist | quickimage | emoticons ',
    
    
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',

    height: '300px'
});