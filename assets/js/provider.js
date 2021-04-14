if (window.location.pathname == "/provider") {
    $ondelete = $(".table tbody td a.remove");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
        var request = {
            "url": 'https://origano-admin.herokuapp.com/api/providers/delete/' + id,
            "method": "DELETE"
        }
        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("data deleted successfully!");
                location.reload();
            })
        }
    })
}