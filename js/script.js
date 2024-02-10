function searchMovie() {
    $("#movie-list").html("");
    $.ajax({
        url: "http://www.omdbapi.com",
        type: "get",
        dataType: "json",
        data: {
            apikey: "4ec4954d",
            s: $("#search-input").val(),
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $("#movie-list").append(
                        `
                        <div class="col-12 col-md-4">
                            <div class="card mb-3">
                                <img src="` +
                            data.Poster +
                            `" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">` +
                            data.Title +
                            `</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">` +
                            data.Year +
                            `</h6>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=` +
                            data.imdbID +
                            `>Detail</a>
                                </div>
                            </div>
                        </div>
                    `
                    );
                });

                $("#search-input").val("");
            } else {
                $("#movie-list").html(
                    `<h3 class="text-center fst-italic text-danger">` +
                        result.Error +
                        `</h3>
                `
                );
            }
        },
    });
}

$("#search-button").on("click", function () {
    searchMovie();
});

$("#search-input").on("keyup", function (e) {
    if (e.which == 13) {
        searchMovie();
    }
});

$("#movie-list").on("click", ".see-detail", function () {
    $.ajax({
        url: "http://www.omdbapi.com",
        type: "get",
        dataType: "json",
        data: {
            apikey: "4ec4954d",
            i: $(this).data("id"),
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $(".modal-body").html(
                    `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="` +
                        movie.Poster +
                        `" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item">
                                    ` +
                        movie.Title +
                        `
                                </li>
                                 <li class="list-group-item">Released: 
                                    ` +
                        movie.Released +
                        `
                                </li>
                                 <li class="list-group-item">Genre:
                                    ` +
                        movie.Genre +
                        `
                                </li>
                                 <li class="list-group-item">Director:
                                    ` +
                        movie.Director +
                        `
                                </li>
                                 <li class="list-group-item">Actor:
                                    ` +
                        movie.Actors +
                        `
                                </li>
                            </ul>
                        </div>
            </div>
        </div>
                `
                );
            }
        },
    });
});
