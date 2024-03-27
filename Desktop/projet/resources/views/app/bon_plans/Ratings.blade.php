<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
    <script src="https://kit.fontawesome.com/37aa586021.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-q+NB8U3h0QfXwvNTOzgUu5ndUAM5A0lGJKeMFXfPXmG3tjYyFnjF3gXJK5RUhB2OweEBa6H7iBxWsDFRUyBLKg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <style>
        /* Global styles */
        .ContenuRating{
            display: flex;
            flex-direction: column;
            margin-top: 10%;
            margin-left: 35%;
            width: 30%;
            height: 60%;
            gap: 20px;
            justify-content: center;
            background-color: white;
            box-shadow: 0px 0px 10px 0px rgb(188, 185, 185); 
        }
        .rating {
        unicode-bidi: bidi-override;
        margin-left: 32%;
        
        }
        .star {
        display: inline-block;
        cursor: pointer;
        font-size: 30px;
        color: #E0E0E0; /* Couleur par défaut des étoiles */
        
        }
        .selected {
        color: #FFE070; /* Couleur des étoiles sélectionnées */
        }
        .ExempleFeedback1{
            display: flex;
            flex-direction: column;
        }
        .ImageUser{
            width: 10%;
            height: 10%;
            margin-left: 43%;
        }
        .NomUser{
            font-size: 16px;
            margin-left: 40%;
        }
        .RatingBusiness{
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        .CommentaireUser{
            color: grey;
            font-size: 16px;
            margin-left: 10%;
        }
        hr{
            color: grey;
            height: 3%;
        }
</style>
</head>
<body>
    <div class="ContenuRating">
    @foreach ($ratings as $rating)
    <div class="ExempleFeedback1">
    @php
        $user = \App\Models\User::find($rating->user_id);
    @endphp
    <img class="ImageUser" src="{{ $user->profile_photo_path ?? '' }}" alt="ImageUser">
    <h3 class="NomUser">{{ $user->name ?? '' }}</h3>      
    @php
        $user = \App\Models\User::find($rating->user_id);
    @endphp
    <div class="rating">
        <input type="hidden" id="rating_value" name="rating_value" value="{{ $rating->rate_bp }}">
        @for ($i = 1; $i <= 5; $i++)
            <span class="star {{ $i <= $rating->rate_bp ? 'selected' : '' }}">&#9733;</span>
        @endfor
    </div>
            
    <div class="RatingBusiness">
        {{-- L'image de five stars  --}}                    
    </div>             
    <p class="CommentaireUser">{{ $rating->comment_bp }}</p>
    </div>
    <hr/>
    
@endforeach
<hr/>
                    
</div>     
</div>     
    
                
   
</body>
</html>
