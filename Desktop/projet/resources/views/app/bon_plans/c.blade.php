<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="stylesheet" href="index.css" />
        <script src="https://kit.fontawesome.com/37aa586021.js" crossorigin="anonymous"></script>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            integrity="sha512-q+NB8U3h0QfXwvNTOzgUu5ndUAM5A0lGJKeMFXfPXmG3tjYyFnjF3gXJK5RUhB2OweEBa6H7iBxWsDFRUyBLKg=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer" />
            
        <style>
            /* Global styles */

            * {
                box-sizing: border-box;
            }
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                color: #191716;
            }

            .setss {
                display: flex;
            }

            /* Navigation styles */
            nav {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2vh 8vh;
                background-color: white;
                border-bottom: 2px solid #cccccc;
            }

            /* Button styles */
            button {
                padding: 8px 16px;
                border: none;
                cursor: pointer;
                transition: background-color 0.3s, color 0.3s;
                animation: fadeIn 0.5s ease-in-out;
            }

            /* Login button styles */
            .login-btn {
                background-color: #ffc700;
                color: #fff;
            }

            .login-btn:hover {
                background-color: #191716;
            }

            .login-btn:active {
                background-color: #000;
            }

            /* register button styles */
            .register-btn {
                background-color: #ffc700;
                color: #fff;
            }

            .register-btn:hover {
                background-color: #191716;
            }

            .register-btn:active {
                background-color: #000;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            /* Filter section styles */
            .filter_section {
                display: flex;
                flex-direction: column;
            }

            .filter_set {
                width: 100%;
                max-width: 45vh;
                min-width: 45vh;
                margin-bottom: 5px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                border: 2px solid #cccccc;
                padding-left: 2vh;
                gap: 2vh;
            }

            legend {
                color: #ffc700;
                font-weight: bold;
                margin-bottom: 1vh;
            }

            .filter_label {
                font-weight: 600;
            }

            .filter_select {
                width: 25vh;
                height: 4vh;
                padding: 8px;
                margin: 8px 0;
                box-sizing: border-box;
                border: 2px solid #cccccc;
                position: relative;
            }

            .filter_select::after {
                content: "▼";
                font-size: 12px;
                color: #cccccc;
                position: absolute;
                top: 50%;
                right: 8px;
                transform: translateY(-50%);
            }

            .filter_select:focus {
                outline: none;
                border-color: #ffc700;
            }

            .filter_select:focus::after {
                color: #ffc700;
            }

            /*filter button*/
            .filter_submit {
                align-self: flex-end;
                background-color: #ffc700;
                color: #fff;
            }

            .filter_submit:hover {
                background-color: #191716;
            }

            .filter_submit:active {
                background-color: #000;
            }

            /*filter button*/

            .filter_label_con {
                display: flex;
                align-items: center;
            }

            /* Content styles */
            .content {
                display: flex;
                flex-direction: column;
                padding: 2vh 8vh;
            }

            /* Left side styles */
            .left_side {
                display: flex;
                flex-direction: column;
                gap: 2vh;
            }

            /*filter checkbox*/

            /* Checkbox filter styles */
            .checkbox_filter {
                display: flex;
                align-items: center;
            }

            .filter_label {
                font-weight: 600;
                margin-right: 2vh; /* Add margin to separate label from checkbox */
            }

            .checkbox_filter input[type="checkbox"] {
                width: 16px; /* Set a specific width for the checkbox */
                height: 16px; /* Set a specific height for the checkbox */
                margin: 0; /* Remove default margin */
                cursor: pointer;
            }

            /* Style the appearance of the checkbox */
            .checkbox_filter input[type="checkbox"]::before {
                content: "\2713"; /* Unicode character for a checkmark */
                display: inline-block;
                font-size: 16px;
                color: transparent;
                background-color: #fff;
                border: 2px solid #cccccc;
                width: 16px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                transition: background-color 0.3s, color 0.3s;
            }

            /* Style the appearance of the checkbox when checked */
            .checkbox_filter input[type="checkbox"]:checked::before {
                color: #fff;
                background-color: #ffc700;
                border-color: #ffc700;
            }

            /*filter checkbox*/

            /*slider*/
            .rating-slider {
                width: 24.5vh;
                position: relative;
            }

            input[type="range"] {
                -webkit-appearance: none;
                width: 100%;
                height: 2px;
                background: #ccc;
                outline: none;
                -webkit-transition: 0.2s;
                transition: opacity 0.2s;
            }

            input[type="range"]:hover {
                opacity: 1;
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                cursor: pointer;
                background-color: #ffc700;
                margin-top: -2vh; /* center the thumb vertically */
            }

            input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                cursor: pointer;
            }

            /*slider*/

            /* suggestion*/

            .sug_set {
                width: 100%;
                max-width: 45vh;
                min-width: 45vh;
                margin-bottom: 20px;
                padding: auto;
                padding-bottom: 3vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 2px solid #cccccc;
                padding-left: 2vh;
            }

            .sug_element {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .sug_buttons {
                border-radius: 60vh;
                width: 5vh;
                height: 5vh;
            }

            .sug_buttons:hover {
                width: 6vh;
                height: 6vh;
            }

            .sug_buttons:active {
                background-color: #000;
            }

            /* suggestion*/

            /* fav*/
            .fav_set {
                width: 100%;
                max-width: 45vh;
                min-width: 45vh;
                max-height: 15vh;
                min-height: 15vh;
                margin-bottom: 1px;
                padding: auto;
                padding-bottom: 3vh;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: 2px solid #cccccc;
                padding-left: 2vh;
            }
            /* fav*/

            /*map*/

            .map_set {
                border: 2px solid #cccccc;
                max-height: 76.1vh;
                /*min-height: 76.1vh;*/
                max-width: 140vh;
                width: 140vh;
                min-width: 50vh;
                margin-left: 3vh;
                padding: 0;
            }

            /*map*/

            .circle {
                position: absolute;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .circle:hover {
                background-color: brighten(10%);
            }

            .icon {
                font-size: 20px;
                color: #191716;
            }

            /*search button*/

            .map_set {
                position: relative;
                overflow: hidden;
            }

            #canvas-container {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                cursor: move;
            }

            .search_map {
                display: flex;
                gap: -3px;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 100;
            }

            .search_button {
                margin-right: 20px;
                background-color: #fff;
                border-width: 2px 2px 2px 0;
                border-style: solid;
                border-color: #cccccc;
            }

            .search_button:active {
                background-color: #fff;
                border-width: 2px 2px 2px 0;
                border-style: solid;
                border-color: #ffc700;
            }

            .search_map_field {
                background-color: #fff;
                border: 2px solid #cccccc;
            }

            .search_map_field::after {
                content: "▼";
                font-size: 12px;
                color: #cccccc;
                position: absolute;
                top: 50%;
                right: 8px;
                transform: translateY(-50%);
            }

            .search_map_field:focus {
                outline: none;
                border-color: #ffc700;
            }

            .search_map_field:focus::after {
                color: #ffc700;
            }

            .add_bonplan {
                position: absolute;
                top: 60vh;
                right: 5vh;
                border-radius: 50%;
                width: 70px;
                height: 70px;
                cursor: pointer;
                transition: background-color 0.3s, color 0.3s;
                animation: fadeIn 0.5s ease-in-out;
            }

            .add_bonplan:hover {
                background-color: #ffc700;
                color: white;
            }

            .add_bonplan:active {
                background-color: #000;
                color: white;
            }

            /* Modal styles */
            .modal-container {
                display: none; /* Change this from flex to none */
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                justify-content: center;
                align-items: center;
                z-index: 999;
}

            .modal-content {
                background-color: white;
                padding: 10px 150px 30px 50px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            }

            .close-modal {
                background-color: #ffc700;
                color: white;
                border: none;
                padding: 8px 16px;
                cursor: pointer;
                margin-top: 10px;
            }

            .close-modal:hover {
                background-color: #191716;
            }

            .open-modal {
                background-color: #ffc700;
                color: white;
                border: none;
                padding: 8px 16px;
                cursor: pointer;
                margin-top: 10px;
                margin-right: 20px;
            }

            .open-modal:hover {
                background-color: #191716;
            }

            /*ajouter bonplan css*/

            /* General styling for input container */
            .input-container {
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;
            }

            /* Styling for label */
            .input-container label {
                margin-bottom: 5px;
            }

            /* Styling for input field, select, and textarea */
            .input-container input,
            .input-container select,
            .input-container textarea {
                height: 35px; /* Adjust the height as needed */
                padding: 8px;
                border: 2px solid #cccccc;
                transition: border-color 0.3s;
            }

            /* Change border color on hover or focus */
            .input-container input:hover,
            .input-container input:focus,
            .input-container select:hover,
            .input-container select:focus,
            .input-container textarea:hover,
            .input-container textarea:focus {
                border-color: #ffc700;
            }

            /* Adjust the height of the textarea */
            .input-container textarea {
                height: 80px; /* Adjust the height as needed */
                resize: vertical; /* Allow vertical resizing */
            }

            /*img*/
            .side_img_upload {
                display: flex;
                flex-direction: column;
            }

            .file-upload {
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-bottom: 10px;
            }

            .upload-label {
                margin-right: 10px;
                font-weight: 600;
                font-size: large;
            }

            .file-upload input {
                display: none;
            }

            .file-upload::before {
                content: "\2b";
                font-family: "Font Awesome 5 Free";
                font-size: 30px;
                color: white;
                display: flex;
                padding: 10px;
                background-color: #ffc700;
                border-radius: 50%;
                margin-right: 10px;
                align-items: center;
                justify-content: center;
                height: 40px;
                width: 40px;
                transition: background-color 0.3s;
            }

            .file-upload:hover::before {
                background-color: #191716;
            }

            .file-status {
                font-size: 12px;
                color: #555;
                margin-top: 5px;
            }
            .ImageUser{
                width: 25%;
                height: 25%;
                border-radius: 200px;
                cursor: pointer;
                margin-left: 20%;
            }
        </style>
    </head>
    <body>
        <nav>
            <svg onclick="window.location.reload();"
                width="125"
                height="28"
                viewBox="0 0 125 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.22656 14.6289H3.84375L3.82031 12.0742H7.44141C8.08203 12.0742 8.60156 11.9961 9 11.8398C9.40625 11.6836 9.70312 11.457 9.89062 11.1602C10.0781 10.8555 10.1719 10.4805 10.1719 10.0352C10.1719 9.52734 10.0781 9.11719 9.89062 8.80469C9.70312 8.49219 9.40625 8.26562 9 8.125C8.60156 7.97656 8.08594 7.90234 7.45312 7.90234H5.22656V22H1.40625V4.9375H7.45312C8.47656 4.9375 9.39062 5.03125 10.1953 5.21875C11 5.40625 11.6836 5.69531 12.2461 6.08594C12.8164 6.47656 13.25 6.96484 13.5469 7.55078C13.8438 8.13672 13.9922 8.82812 13.9922 9.625C13.9922 10.3203 13.8359 10.9688 13.5234 11.5703C13.2188 12.1719 12.7266 12.6602 12.0469 13.0352C11.3672 13.4102 10.457 13.6133 9.31641 13.6445L8.22656 14.6289ZM8.07422 22H2.87109L4.25391 19.0469H8.07422C8.66016 19.0469 9.13672 18.9531 9.50391 18.7656C9.87109 18.5781 10.1406 18.3242 10.3125 18.0039C10.4844 17.6836 10.5703 17.3242 10.5703 16.9258C10.5703 16.457 10.4883 16.0508 10.3242 15.707C10.168 15.3633 9.91797 15.0977 9.57422 14.9102C9.23828 14.7227 8.78906 14.6289 8.22656 14.6289H4.80469L4.82812 12.0742H9.01172L9.90234 13.082C10.9883 13.0586 11.8555 13.2344 12.5039 13.6094C13.1602 13.9766 13.6328 14.4609 13.9219 15.0625C14.2109 15.6641 14.3555 16.3008 14.3555 16.9727C14.3555 18.082 14.1172 19.0117 13.6406 19.7617C13.1641 20.5039 12.457 21.0625 11.5195 21.4375C10.5898 21.8125 9.44141 22 8.07422 22ZM48.832 4.9375V22H45.0234L38.5781 10.9727V22H34.7578V4.9375H38.5781L45.0352 15.9648V4.9375H48.832ZM70.3359 16.0703H66.0469V13.1055H70.3359C70.9688 13.1055 71.4766 13 71.8594 12.7891C72.25 12.5781 72.5352 12.2891 72.7148 11.9219C72.9023 11.5469 72.9961 11.125 72.9961 10.6562C72.9961 10.1719 72.9023 9.72266 72.7148 9.30859C72.5352 8.88672 72.25 8.54688 71.8594 8.28906C71.4766 8.03125 70.9688 7.90234 70.3359 7.90234H67.4297V22H63.6094V4.9375H70.3359C71.6953 4.9375 72.8594 5.18359 73.8281 5.67578C74.8047 6.16797 75.5508 6.84375 76.0664 7.70312C76.5898 8.55469 76.8516 9.53125 76.8516 10.6328C76.8516 11.7344 76.5898 12.6914 76.0664 13.5039C75.5508 14.3164 74.8047 14.9492 73.8281 15.4023C72.8594 15.8477 71.6953 16.0703 70.3359 16.0703ZM90.3047 19.0469V22H81.6914V19.0469H90.3047ZM82.9922 4.9375V22H79.1719V4.9375H82.9922ZM99.5039 8.18359L95.0977 22H91.0195L97.3359 4.9375H99.9141L99.5039 8.18359ZM103.16 22L98.7422 8.18359L98.2852 4.9375H100.898L107.238 22H103.16ZM102.973 15.6484V18.6016H94.0781V15.6484H102.973ZM122.73 4.9375V22H118.922L112.477 10.9727V22H108.656V4.9375H112.477L118.934 15.9648V4.9375H122.73Z"
                    fill="#191716" />
                <path
                    d="M24 4C22.1435 4 20.363 4.7375 19.0503 6.05025C17.7375 7.36301 17 9.14348 17 11C17 13.38 18.19 15.47 20 16.74V19C20 19.2652 20.1054 19.5196 20.2929 19.7071C20.4804 19.8946 20.7348 20 21 20H27C27.2652 20 27.5196 19.8946 27.7071 19.7071C27.8946 19.5196 28 19.2652 28 19V16.74C29.81 15.47 31 13.38 31 11C31 9.14348 30.2625 7.36301 28.9497 6.05025C27.637 4.7375 25.8565 4 24 4ZM21 23C21 23.2652 21.1054 23.5196 21.2929 23.7071C21.4804 23.8946 21.7348 24 22 24H26C26.2652 24 26.5196 23.8946 26.7071 23.7071C26.8946 23.5196 27 23.2652 27 23V22H21V23Z"
                    fill="#FFC700" />
            </svg>
            <!--Image User-->

            <div class="nav_buttons">
                <img class="ImageUser" src="{{ $user->profile_photo_path ?? 'https://static.thenounproject.com/png/6224470-200.png' }}" alt="ImageUser" onclick="LoginFunction()">
            </div>
        </nav>

        <div class="content">
            <h1>Explore, Try, Search For A New <span style="color: #ffc700">Adventure</span></h1>

            <div class="setss">
                <div class="left_side">
                    <form class="filter_section" action="/action_page.php">
                        <fieldset class="filter_set">
                            <legend>Filters</legend>

                            <!--categorie selector-->
                            <div class="filter_label_con" style="gap: 2.2vh">
                                <label class="filter_label" for="city">Categories:</label>
                                <select
                                    class="filter_select"
                                    id="category"
                                    name="category"
                                    required>
                                    <option value="" disabled selected>Select a category</option>
                                </select>
                            </div>

                            <!--cities selector-->
                            <div class="filter_label_con" style="gap: 8vh">
                                <label class="filter_label" for="city">City:</label>
                                <select class="filter_select" id="city" name="city" required>
                                    <option value="" disabled selected>Select a city</option>
                                    <option value="ariana">Ariana</option>
                                    <option value="beja">Béja</option>
                                    <option value="ben-arous">Ben Arous</option>
                                    <option value="bizerte">Bizerte</option>
                                    <option value="gabes">Gabès</option>
                                    <option value="gafsa">Gafsa</option>
                                    <option value="jendouba">Jendouba</option>
                                    <option value="kairouan">Kairouan</option>
                                    <option value="kasserine">Kasserine</option>
                                    <option value="kebili">Kebili</option>
                                    <option value="kef">Le Kef</option>
                                    <option value="mahdia">Mahdia</option>
                                    <option value="manouba">La Manouba</option>
                                    <option value="medenine">Médenine</option>
                                    <option value="monastir">Monastir</option>
                                    <option value="nabeul">Nabeul</option>
                                    <option value="sfax">Sfax</option>
                                    <option value="sidi-bouzid">Sidi Bouzid</option>
                                    <option value="siliana">Siliana</option>
                                    <option value="sousse">Sousse</option>
                                    <option value="tataouine">Tataouine</option>
                                    <option value="tozeur">Tozeur</option>
                                    <option value="tunis">Tunis</option>
                                    <option value="zaghouan">Zaghouan</option>
                                </select>
                            </div>

                            <div class="checkbox_filter" style="gap: 1.8vh">
                                <label class="filter_label" for="Offers">Offers Only:</label>
                                <input type="checkbox" />
                            </div>

                            <div class="checkbox_filter" style="gap: 2.5vh">
                                <label class="filter_label" for="Offers">Open Only:</label>
                                <input type="checkbox" />
                            </div>

                            <div class="checkbox_filter" style="gap: 5.8vh">
                                <label class="filter_label" for="rating">Rating:</label>
                                <div class="rating-slider">
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value="1"
                                        list="rating-list" />
                                </div>

                                <datalist id="rating-list">
                                    <option value="1"></option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                    <option value="4"></option>
                                    <option value="5"></option>
                                </datalist>
                            </div>

                            <br />
                            <button class="filter_submit" type="submit">Filter</button>
                        </fieldset>
                    </form>

                    <fieldset class="fav_set">
                        <legend>Favorites</legend>
                    </fieldset>

                    <fieldset class="sug_set">
                        <legend>Suggestions</legend>
                        <div class="sug_element">
                            <p class="filter_label">Deal of the day</p>
                            <button class="sug_buttons" style="background-color: #ffc700">
                                <i class="fa-solid fa-exclamation"></i>
                            </button>
                        </div>
                        <div class="sug_element">
                            <p class="filter_label">Bonplan of the day</p>
                            <button class="sug_buttons"></button>
                        </div>
                    </fieldset>
                </div>

                <fieldset class="map_set">
                    <legend>Map</legend>
                    <div id="canvas-container">
                        <div class="search_map">
                            <input class="search_map_field" type="search" />
                            <button class="search_button">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <button class="add_bonplan" onclick="openModal()">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div id="circles"></div>
                    </div>
                </fieldset>
            </div>
        </div>

        <!--individual container-->
        <div class="modal-container" id="modalContainer">
            <!-- Modal Content -->
            <div class="modal-content">
                <h3 style="font-size: 25px; color: #ffc700">Add New Bonplan</h3>
                <form
                    id="addBonplanForm"
                    method="POST"
                    action="{{ route('bon-plans.store') }}"
                    enctype="multipart/form-data">
                    @csrf

                    <div class="file-upload">
                        <div class="side_img_upload">
                            <label for="image" class="upload-label"
                                >Upload Image
                                <input type="file" name="image" id="image" accept="image/*" />
                            </label>
                            <span class="file-status">No image uploaded</span>
                        </div>
                    </div>

                    <br />

                    <!-- Name Input -->
                    <div class="input-container">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="nom_bp" required />
                    </div>

                    <!-- Categories Input -->
                    <div class="input-container">
                        <label for="categorie_bp">Categories:</label>
                        <select name="categorie_bp" id="categorie_bp" required>
                            <option value="" disabled selected>Select a category</option>
                            <option value="clothing_store">Clothing Store</option>
                            <option value="complex">Complex</option>
                            <option value="coffee_shop">Coffee Shop</option>
                            <option value="fastfood">Fast Food</option>
                            <option value="store">Store</option>
                            <option value="market">Market</option>
                            <option value="educational">Educational</option>
                            <option value="bar">Bar</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="gym">Gym</option>
                            <option value="tea_house">Tea House</option>
                        </select>
                    </div>

                    <!-- Phone Number Input -->
                    <div class="input-container">
                        <label for="tel_bp">Phone Number:</label>
                        <input type="tel" id="tel_bp" name="tel_bp" required />
                    </div>

                    <!-- Address Input -->
                    <div class="input-container">
                        <label for="location">Address:</label>
                        <input type="text" id="location" name="location" required />
                    </div>

                    <!-- Description Input -->
                    <div class="input-container">
                        <label for="desc_bp">Description:</label>
                        <textarea id="desc_bp" name="desc_bp" rows="4" required></textarea>
                    </div>

                    <!-- Opening Time Input -->
                    <div class="input-container">
                        <label for="ouverture">Opening Time:</label>
                        <input
                            type="time"
                            id="ouverture"
                            name="ouverture"
                            class="time-add-input"
                            required />
                    </div>

                    <!-- Closing Time Input -->
                    <div class="input-container">
                        <label for="fermuture">Closing Time:</label>
                        <input
                            type="time"
                            id="fermuture"
                            name="fermuture"
                            class="time-add-input"
                            required />
                    </div>

                    <br />

                    <button class="open-modal" type="submit">Submit</button>
                    <button class="close-modal" onclick="closeModal()">Close</button>
                </form>
            </div>
        </div>

        <script>   
            function LoginFunction(){
                window.location.href = "/login";
            }        
            
            function openModal() {
                document.getElementById("modalContainer").style.display = "flex";
            }

            function closeModal() {
                document.getElementById("modalContainer").style.display = "none";
            }

            // Optional: Close modal if user clicks outside the form
            window.onclick = function (event) {
                if (event.target === document.getElementById("modalContainer")) {
                    closeModal();
                }
            };

            /*img upload*/
            document.addEventListener("DOMContentLoaded", function () {
                const fileUploadDiv = document.querySelector(".file-upload");
                const fileInput = document.getElementById("image");

                fileUploadDiv.addEventListener("click", function () {
                    fileInput.click();
                });

                fileInput.addEventListener("change", function () {
                    const fileName = this.value.split("\\").pop(); // Extract file name
                    const fileStatus = document.querySelector(".file-status");
                    fileStatus.textContent = fileName ? fileName : "No image uploaded";
                });
            });
        </script>
        <script type="module">
            /* map */
            const canvasContainer = document.getElementById("canvas-container");
            const circlesContainer = document.getElementById("circles");
            let circleCount = 0;
            // const bonPlans = await getBonPlans();
            const bonPlans = await getBonPlans();
            const minDistance = 50; // Minimum distance between circles

            function processProperties(category) {
                switch (category) {
                    case "clothing_store":
                        return {
                            color: "#91a6ff",
                            icon: "fa-tshirt",
                        };
                    case "complex":
                        return {
                            color: "#00a6ed",
                            icon: "fa-building",
                        };
                    case "coffee_shop":
                        return {
                            color: "#786452",
                            icon: "fa-mug-hot",
                        };
                    case "store":
                        return {
                            color: "#f37748",
                            icon: "fa-store",
                        };
                    case "market":
                        return {
                            color: "#baf2bb",
                            icon: "fa-shopping-cart",
                        };
                    case "educational":
                        return {
                            color: "#41E2BA",
                            icon: "fa-school",
                        };
                    case "bar":
                        return {
                            color: "#5E4AE3",
                            icon: "fa-glass-martini",
                        };
                    case "restaurant":
                        return {
                            color: "#DC6ACF",
                            icon: "fa-utensils",
                        };
                    case "gym":
                        return {
                            color: "#7E7F83",
                            icon: "fa-dumbbell",
                        };
                    case "tea_house":
                        return {
                            color: "#E86A92",
                            icon: "fa-coffee",
                        };
                    default:
                        return {
                            color: "black",
                            icon: "fa-question",
                        };
                }
            }

            function isValidPosition(x, y) {
                for (const circle of circlesContainer.children) {
                    const circleX = parseFloat(circle.style.left);
                    const circleY = parseFloat(circle.style.top);
                    const distance = Math.sqrt((circleX - x) ** 2 + (circleY - y) ** 2);
                    if (distance < minDistance) {
                        return false;
                    }
                }
                return true;
            }

            function getRandomPosition(circleCount) {
                const canvasWidth = canvasContainer.clientWidth;
                const canvasHeight = canvasContainer.clientHeight;
                const offScreenBoundary = 100; // Distance beyond canvas boundary
                let x, y;
                do {
                    if (circleCount > 12) {
                        // Generate positions beyond canvas boundaries
                        x =
                            canvasWidth / 2 +
                            (Math.random() * (canvasWidth + offScreenBoundary) -
                                canvasWidth / 2 -
                                offScreenBoundary);
                        y =
                            canvasHeight / 2 +
                            (Math.random() * (canvasHeight + offScreenBoundary) -
                                canvasHeight / 2 -
                                offScreenBoundary);
                    } else {
                        // Generate positions within canvas boundaries
                        x = Math.random() * (canvasWidth - 40); // 40 is diameter of circle
                        y = Math.random() * (canvasHeight - 40);
                    }
                } while (!isValidPosition(x, y));
                return { x, y };
            }

            function createCircle(bonPlan) {
                circleCount++;
                const category = processProperties(bonPlan.categorie_bp);

                const circle = document.createElement("div");
                circle.classList.add("circle");

                const position = getRandomPosition(circleCount);
                circle.style.left = position.x + "px";
                circle.style.top = position.y + "px";
                circle.style.backgroundColor = category.color;
                circle.title = bonPlan.nom_bp;
                circle.innerHTML = `<i class="icon fas ${category.icon}"></i>`;
                circle.setAttribute("id", bonPlan.id);
                circlesContainer.appendChild(circle);

                // Event listeners
                /*circle.addEventListener("click", function () {
                    openModal(bonPlan);
                });*/
            }

            function renderCircles() {
                for (const bonPlan of bonPlans) {
                    createCircle(bonPlan);
                }
            }

            renderCircles();

            let isDragging = false;
            let startDragX, startDragY;

            canvasContainer.addEventListener("mousedown", function (event) {
                isDragging = true;
                startDragX = event.clientX;
                startDragY = event.clientY;
            });

            canvasContainer.addEventListener("mouseup", function () {
                isDragging = false;
            });

            canvasContainer.addEventListener("mousemove", function (event) {
                if (isDragging) {
                    const offsetX = event.clientX - startDragX;
                    const offsetY = event.clientY - startDragY;
                    startDragX = event.clientX;
                    startDragY = event.clientY;
                    moveCircles(offsetX, offsetY);
                }
            });

            function moveCircles(offsetX, offsetY) {
                for (const circle of circlesContainer.children) {
                    const left = parseFloat(circle.style.left) || 0;
                    const top = parseFloat(circle.style.top) || 0;
                    circle.style.left = left + offsetX + "px";
                    circle.style.top = top + offsetY + "px";
                }
            }

            async function getBonPlans() {
                try {
                    const response = await fetch('/api/bon-plans');
                    if (!response.ok) {
                        throw new Error('Failed to fetch BonPlans');
                    }
                    const bonPlans = await response.json();
                    return bonPlans;
                } catch (error) {
                    console.error('Error fetching BonPlans:', error.message);
                    return [];
                }
            }
        </script>
    </body>
</html>