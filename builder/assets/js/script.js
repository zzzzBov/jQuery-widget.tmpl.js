//data:text/javascript;base64, + btoa(code)
$('.widget-method').on('change', function () {
    var $this,
        $req,
        $otherReqs;
    //get the required methods
    $this = $(this);
    $req = $($this.data('requires'));
    if ($this.prop('checked')) {
        //if the checkbox was [checked], force the required methods to be [checked] and [readonly]
        //run an update on all the required methods
        $req.prop('disabled', true).prop('checked', true).change();
    } else {
        //if the checkbox was unchecked, [readonly] can be removed from the required methods that are not required by other [checked] methods
        $otherReqs = $();
        $('.widget-method:checked').each(function () {
            $otherReqs = $otherReqs.add($(this).data('requires'));
        });
        $req.not($otherReqs).prop('disabled', false);
    }
});

$('#widget-generator').submit(function (e) {
    e.preventDefault();
    $.get($(this).attr('action'), {t: Math.random()}, function (template) {
        var data,
            jqwt;
        data = {
            widgetName: $('#widget-name').val(),
            safeWidgetName: JSON.stringify($('#widget-name').val()),
            widgetAuthor: $('#widget-author').val(),
            methods: '',
            copyright: $('#widget-copyright:checked').val() || ''
        }
        
        $('.widget-method').each(function () {
            if ($(this).prop('checked')) {
                data.methods += $(this).val();
            }
        });
        
        jqwt = template.tmpl(data);
        //console.log(jqwt);
        window.open('data:text/javascript;base64,' + btoa(jqwt));
    }, 'text');
});