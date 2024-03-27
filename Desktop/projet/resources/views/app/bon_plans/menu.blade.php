<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>

        body {
            margin: 0;
            padding: 0;
            background-color: rgba(0, 0, 0, 0.2); 
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, Helvetica, sans-serif;
        }
        
        .container {
            background-color: #CCCCCC;
            display: flex;
            flex-direction: column;
        }
        
        .section {
            margin-bottom: 3px;
            padding: 10px;
            background-color: white;
        }
        
        .business-info {
            
        }
        
        .menu {
            
        }
        
        .offers {
            
        }

        .button-container {
            display: flex;
            justify-content: space-between;
        }
        
        .button {
            border: #007bff;
            width: 100%;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        
        .button:hover {
            background-color: #0056b3;
        }

        .menu-section {
            margin-top: 20px;
        }
        
        .menu-header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .logo-container {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #007bff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
        }
        
        .logo-container i {
            color: white;
            font-size: 24px;
        }
        
        .menu-header h2 {
            margin: 0;
            color: #007bff;
        }

        .menu-content {
            margin-left: 80px;
        }
        
        .food-type {
            margin-bottom: 30px;
        }
        
        .food-type h3 {
            margin-top: 0;
            margin-bottom: 15px;
        }
        
        .food-item {
            color: rgba(25, 23, 22, 0.6);
            display: flex;
            justify-content: space-between;
        }
        
        .food-name {
            flex-grow: 1;
        }
        
        .food-price {
            margin-left: 20px;
        }

        /*partie jdida */
        
        .offer-header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .logo-container-offer {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #FFC700;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 15px;
        }
        
        .logo-container-offer i {
            color: white;
            font-size: 24px;
        }
        
        .offer-header h2 {
            margin: 0;
            color: #FFC700;
        }

        .offer-detail {
            padding: 20px;
            background-color: #FFF8E1;
            margin-bottom: 20px; 
        }
        
        .offer-title {
            margin: 0 0 10px 0; 
            color: #333; 
        }
        
        .offer-description {
            margin: 0; 
            color: #666; 
        }

        .offers{
            padding-top: 25px;
        }

        /*partie jdida */
        
        
        
    </style>
    <script src="https://kit.fontawesome.com/37aa586021.js" crossorigin="anonymous"></script>
</head>


<body>
    
    <div class="container">
        
        <div class="section business-info">Business Information</div>


        <div class="section menu">

            <div class="menu-section">

                <div class="menu-header">
                    <div class="logo-container">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <h2>Menu</h2>
                </div>


                <div class="menu-content">
		@foreach ($menus as $menu)
                    <div class="food-type">
                        <h3>{{ $menu->nom }}</h3>
			@foreach ($menu->sousMenus as $sousMenu)
                        <div class="food-item">
                            <span class="food-name">{{ $sousMenu->nom }}</span>
                            <span class="food-price">{{ $sousMenu->prix }} dt</span>
                        </div>
                        @endforeach
                    </div>
 		@endforeach

               

                </div>
            </div>            
        </div>

        <!--el partie el jdida-->
        <div class="section offers">
            <div class="offer-header">
                <div class="logo-container-offer">
                    <i class="fa-solid fa-exclamation"></i>
                </div>
                <h2>Offers</h2>
            </div>
        
            @foreach ($offres as $offre)
        <div class="offer-detail">
            <h3 class="offer-title">{{ $offre->title }}</h3>
            <p class="offer-description">{{ $offre->content }}</p>
        </div>
    @endforeach
        <!--el partie el jdida-->


        <div class="button-container">

            <button class="button">Button 1</button>
            <button class="button">Button 2</button>

        </div>
    </div>

</body>
</html>