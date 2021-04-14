if (window.location.pathname == "/foodsection") {
    $(".table tbody td a.delete").click(function() {
        var id = $(this).attr("data-id")
        var request = {
            "url": 'https://origano-admin.herokuapp.com/api/foods/delete/' + id,
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