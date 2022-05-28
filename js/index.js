function loadDoc() {
    $.ajax({
        type: 'GET',
        url: "/movies",
        success: function (result) {
         $("<div id='form_div' class='hid' > </div>").insertAfter("#div1");
        tab(result);
        },
        error: function (err) {
        console.log("err", err);
        }
    });
}

function tab(data){
    let bord = 3;
    let str = "<table cellspacing='10' border='" + bord +"'><tr><th>ID</th><th>Name</th><th>Picture</th><th>Director</th><th>Date</th><th>Rating</th><th>Series_Details</th><th>Actors</th><th>Delete Movie</th><th>Edit Movie</th><th>Add Series</th><th>Add Actor</th></tr>";
    let size = data.length;
    let actor_html = `<label for="name">Name</label><input type="text" class="form-control" name="name" id="name{}" placeholder="write name here" required><label for="picture">Picture</label><input type="text" class="form-control" name="picture" id="picture[]" placeholder="write picture url here" required><label for="site">Site</label><input type="text" class="form-control" name="site" id="site[]" placeholder="write site url here" required>`;
    let series_html = `<label for="value">Value</label><input type="text" class="form-control" name="value" id="value{}" placeholder="write value here" required>`;
    let del_ajax = "$.ajax({type: `DELETE`,url: `{}`,success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let add_actor_ajax = "$.ajax({type: `POST`,url: `{}`,data: obj = {name: name_val, picture: picture_val, site: site_val},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let add_series_ajax = "$.ajax({type: `POST`,url: `{}`,data: obj = {value: value_val},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    let edit_ajax = "$.ajax({type: `PUT`,url: `movies/` + id_val,data: obj = {id: id_val, start_date: date_val,duration: duration_val,price: price_val,guide: {name: gname,email: gemail,cellular: gphone}},success: function (result) {location.href = `/list`;},error: function (err) {console.log(`err`, err);}});";
    for(let i = 0; i < size; i++)
    {   
        str = str + "<tr>";
        str = str + "<td>" + data[i][1]["id"] +"</td>";
        str = str + "<td>" + data[i][1]["name"] +"</td>";
        str = str + "<td>" + data[i][1]["picture"] +"</td>";
        str = str + "<td>" + data[i][1]["director"] +"</td>";
        str = str + "<td>" + data[i][1]["date"] +"</td>";
        str = str + "<td>" + data[i][1]["rating"] +"</td>";
        str += "<td>";
        let tempStr = '';
        if (data[i][1].isSeries) {
            let num_series = data[i][1].series_details.length;
            for (let index = 0; index < num_series; index ++) {
                tempStr = del_ajax;
                tempStr = tempStr.replace('{}', 'movies/' + data[i][1]["id"] + '/series/' + data[i][1]["series_details"][index]);
                str += data[i][1].series_details[index] + `</br><button onclick="{${tempStr}}">Delete</button></br>`;
            }
        }
        str += "</td>";
        str += "<td>";
        let copy = '';
        if(data[i][1].actors){
            let num_path = data[i][1].actors.length;
            for (let index = 0; index < num_path; index++) {
                let s_name = data[i][1].actors[index].name;
                let s_picture = data[i][1].actors[index].picture;
                let s_site = data[i][1].actors[index].site;
                copy = del_ajax;
                copy = copy.replace('{}', 'movies/' + data[i][1]["id"] + '/actors/' + s_name);
                str += s_name +" ( " + s_picture + " ) " + "At " + s_site + `</br><button onclick="{${copy}}">Delete</button></br>`;         
            }
        }
        str += "</td>";
        copy = del_ajax.replace('{}','movies/' +data[i][1]["id"]);
        str += `<td><button onclick="{${copy}}">Delete</button></td>`;
        str += `<td><button onclick="{$('#form_div').removeClass('hid').addClass('show'); $('#edit_id').val('${data[i][1]["id"]}');}">Edit</button></td>`;

        copy = add_series_ajax.replace('{}','movies/' +data[i][1]["id"] + '/series');
        let site_copy = series_html;
        site_copy = site_copy.replace('{}', String(i));
        site_copy = site_copy.replace('[]', String(i));
        let get_info = `let value_val = $('#value${String(i)}').val();if(!value_val) return;`;
        str += `<td>${site_copy}<button onclick="{${get_info} ${copy}}">Add</button></td>`;

        copy = add_actor_ajax.replace('{}','movies/' +data[i][1]["id"] + '/actors');
        site_copy = actor_html;
        site_copy = site_copy.replace('{}', String(i));
        site_copy = site_copy.replace('[]', String(i));
        site_copy = site_copy.replace('[]', String(i));
        get_info = `let name_val = $('#name${String(i)}').val();let picture_val = $('#picture${String(i)}').val();let site_val = $('#site${String(i)}').val();if(!name_val || !picture_val || !site_val) return;`;
        str += `<td>${site_copy}<button onclick="{${get_info} ${copy}}">Add</button></td>`;
        str = str + "</tr>";
    }
    str = str + "</table>";
    let tableToAdd = $(str);
    $("#div1").html(tableToAdd);
    // let get_date = get_ajax;
    // get_date = get_date.replace('{}', '/tours_date');
    // let get_aplhabetical = get_ajax.replace('{}', '/tours');
    // let get_price = get_ajax.replace('{}', '/tours_price');
    // let get_duration = get_ajax.replace('{}', '/tours_duration');
    // let but = $(`<button onclick="{${get_date}}">Date sort</button></br></br><button onclick="{${get_aplhabetical}}">Alphabetical sort</button></br></br><button onclick="{${get_price}}">Price sort</button></br></br><button onclick="{${get_duration}}">Duration sort</button>`);
    // $("#div2").html(but);
    let get_info2 = `let id_val = $('#edit_id').val();let picture_val = $('#picture').val();let director_val = $('#director').val();let date_val = $('#date').val();let rating_val = $('#rating').val();let aname = $('#aname').val();let apicture = $('#apicture').val();let asite = $('#asite').val();if(!id_val) return;`;
    $("#form_div").html($(`<form id="movie_form" name="movie_form">
    <div id="name-group" class="form-group">
        <label for="name">Name/ID</label>
        <input type="text" class="form-control" name="name" id="edit_id" placeholder="write name/id here">
    </div>
    <div id="picture-group" class="form-group">
        <label for="picture">Picture</label>
        <input type="text" class="form-control" name="picture" id="picture" placeholder="write picture url here">
    </div>
    <div id="director-group" class="form-group">
        <label for="director">Director</label>
        <input type="text" class="form-control" name="director" id="director" placeholder="write director here">
    </div>
    <div id="date-group" class="form-group">
        <label for="date">Date</label>
        <input type="date" class="form-control" min="2021-05-09" name="date" id="date" placeholder="choose date here">
    </div>
    <div id="rating-group" class="form-group">
        <label for="rating">Rating</label>
        <input type="number" min="1" max="5" class="form-control" name="rating" id="rating" placeholder="write rating here">
    </div>
    <div id="name-actor" class="form-group">
        <label for="aname">Actor name</label>
        <input type="text" class="form-control" name="aname" id="aname" placeholder="write actor name here">
    </div>
    <div id="picture-group" class="form-group">
        <label for="picture">Actor picture</label>
        <input type="text" class="form-control" name="picture" id="apicture" placeholder="write actor picture here">
    </div>
    <div id="site-group" class="form-group">
        <label for="site">Actor site</label>
        <input type="text" class="form-control" name="site" id="asite" placeholder="write actor site here">
    </div>
    </form>
    <button onclick="{${get_info2} ${edit_ajax}}">Submit Editing</button>`));
}

$("document").ready(loadDoc);