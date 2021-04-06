if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
        var request = {
            "url": 'http://localhost:3000/api/users/delete/' + id,
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