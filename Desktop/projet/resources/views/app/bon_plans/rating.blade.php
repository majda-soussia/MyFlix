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
    margin-left: 30%;
    width: 40%;
    height: 60%;
    gap: 20px;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgb(188, 185, 185); 
}
.AddRating{
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 3%;
}
.TitreAddRating{
    color: #FFC700;
    font-weight: bold;
    font-size: 20px;
}
.RatingBusiness{
    margin-left: 3%;
}
.ratings {
    display: flex;
    flex-direction: row-reverse;
}

.ratings .star {
    cursor: pointer;
    font-size: 30px;
}
.ratings .star.selected,
.ratings .star:hover {
    color: orange;
}
.ratings span{
   cursor: pointer;
   transition: color .2s;
   font-size: 50px;
}
.ratings span:hover{
   color: orange;
}
.ratings span:hover ~ span{
   color: orange;
}

.PutYourRating{
    display: flex;
    flex-direction: row;
}

.PartieCommentaire{
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.PartieCommentaire1{
    display: flex;
    flex-direction: column;
    gap: 1px;
}
.Commentaire{
    margin-top: -5%;
    border: 1px solid black;
    height: 500%;
    width:200%;
    margin-bottom: 10%;
}
.BoutonAddComment{
    color: white;
    background-color: #FFC700;
    font-weight: 200;
    padding: 2%;
    height: 9%;
    width: 10%;
    border: none;    
    margin-top: 7%;
    margin-left: 29%;
    cursor: pointer;
}
</style>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.ratings .star');
    const ratingValueInput = document.getElementById('rating_value');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-value'));
            ratingValueInput.value = rating;
            saveRating(rating);
            updateStarColors(this); // Met à jour les couleurs des étoiles
        });
        star.addEventListener('mouseover', function() {
            updateStarColors(this); // Met à jour les couleurs des étoiles au survol
        });
    });

    function saveRating(rating) {
        const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
        ratings.push(rating);
        localStorage.setItem('ratings', JSON.stringify(ratings));
        console.log('Rating saved:', rating);
    }

    function updateStarColors(selectedStar) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            if (value <= parseInt(selectedStar.getAttribute('data-value'))) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }
});
</script>

</head>
<body>
    <div class="RatingPage">
        <div class="ContenuRating">
            <div class="AddRating">
                <h3 class="TitreAddRating">Add your Rating</h3>
                <form id="addRatingForm" method="POST" action="{{ route('ratings.store', ['bonPlan' => $bonPlan->id, 'user' => $user->id]) }}" enctype="multipart/form-data">
                    @csrf
                    <div class="PutYourRating">
                    <p class="TitrePutYourRating">Rating</p>
                    <div class="RatingBusiness">
                    <input type="hidden" id="rating_value" name="rate_bp" value="0">
                            <div class="ratings" name="rate_bp">
                                <span class="star" data-value="5">★</span>
                                <span class="star" data-value="4">★</span>
                                <span class="star" data-value="3">★</span>
                                <span class="star" data-value="2">★</span>
                                <span class="star" data-value="1">★</span>
                            </div> 
                    </div>
</div>
                    <div class="PartieCommentaire">
                        <div class="PartieCommentaire1">
                        
                            <p class="TitreCommentaire">Description</p>
                            <!-- Utilisez le name "description" pour que le champ soit envoyé avec le formulaire -->
                            <textarea name="comment_bp" class="Commentaire" placeholder="Write your comment here..."></textarea>
                        </div>
                        <!-- Changez le type du bouton pour submit -->
                        <button type="submit" class="BoutonAddComment">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
