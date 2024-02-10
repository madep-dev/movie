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
                            <div class="card shadow border-0 mb-5">
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
                                    <a href="#" class="btn btn-dark w-100 mt-3 see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=` +
                            data.imdbID +
                            `>Detail</a>
                                </div>
                            </div>
                        </div>
                    `
                    );
                });

                // $("#search-input").val("");
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
                                <div class="row">
                                    <div class="col-2"><span class="fw-semibold">Title </span></div>
                                    <div class="col-10">: ` +
                        movie.Title +
                        `</div>
                                </div>                                    
                                </li>
                                <li class="list-group-item">
                                <div class="row">
                                    <div class="col-2"><span class="fw-semibold">Released </span></div>
                                    <div class="col-10">: ` +
                        movie.Released +
                        `</div>
                                </div>  
                                </li>
                                <li class="list-group-item">
                                <div class="row">
                                    <div class="col-2"><span class="fw-semibold">Genre </span></div>
                                    <div class="col-10">: ` +
                        movie.Genre +
                        `</div>
                                </div>  
                                </li>
                                <li class="list-group-item">
                                <div class="row">
                                    <div class="col-2"><span class="fw-semibold">Director </span></div>
                                    <div class="col-10">: ` +
                        movie.Director +
                        `</div>
                                </div>  
                                </li>
                                <li class="list-group-item">
                                <div class="row">
                                    <div class="col-2"><span class="fw-semibold">Actor </span></div>
                                    <div class="col-10">: ` +
                        movie.Actors +
                        `</div>
                                </div>  
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
