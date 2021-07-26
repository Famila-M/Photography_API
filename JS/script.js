getPhotos();
async function getPhotos(){
    const access_key = 'tZmzJDcwSeO_OA3olgRau9gomzc6Imn1BwY4wlyuugs';
    try{
        const result = await fetch(`https://api.unsplash.com/photos/?client_id=${access_key}`,
        {
            method:"GET",
            headers: { Authorization: "Client-ID " +access_key},
        }
        );
        const data = await result.json();
        var user_list = document.querySelector("#user_list");
        let output = '';
        
        data.forEach(obj => {
            
            output += `
            <div class="col-lg-4 mt-3 mb-3">
                <div class="card" style="width: 18rem;background-color: ${obj.color};">
                    <img id=${obj.user.username} onclick="getUser(this.id)" src="${obj.user.profile_image.large}" class="m-2 " alt="...">
                    <div class="card-body text-success">
                    <h4 class="card-title font-weight-bold">${obj.user.name}</h4>
                    <p class="card-text"><b>Contest likes:</b> ${obj.likes} <i class="fa fa-heart text-danger"></i></p>
                    <p class="card-text"><b>Total photos:</b> ${obj.user.total_photos} <i class="fa fa-camera text-danger"></i></p>
                    <p class="card-text"><b>Total Likes:</b> ${obj.user.total_likes} <i class="fa fa-heart text-danger"></i></p>
                    <a href="${obj.user.portfolio_url}" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
            `;
            user_list.innerHTML = output
        });
       
    }catch(error){
        console.log(error);
    }
}
// getUser()
async function getUser(username){
    const access_key = 'tZmzJDcwSeO_OA3olgRau9gomzc6Imn1BwY4wlyuugs';
    var user_list = document.querySelector("#user_list");
    user_list.style.display = "none"
    var user_details = document.querySelector("#user_details");
    user_details.style.display="block";
    let output = '';
    try{
        const result = await fetch(`https://api.unsplash.com/users/${username}/photos`,
        {
            method:"GET",
            headers: { Authorization: "Client-ID " +access_key},
        }
        );
        const data = await result.json();
        console.log(data);
        data.forEach(obj => {
            output += `
            <div class="col-lg-3 mt-3 mb-3">
                <div class="card" style="width: 20rem;">
                    <img src="${obj.urls.full}" class="m-2" alt="...">                    
                </div>
            </div>
            `;
            user_details.innerHTML = `<div class="h1 text-center text-warning"><i class="fa fa-arrow-left" onclick="back()"></i> User Photo Galery</div>`+output
     
        });
    }catch(error){
        console.log(error);
    }
}
function back(){
    var user_list = document.querySelector("#user_list");
    user_list.style.display = ""
    var user_details = document.querySelector("#user_details");
    user_details.style.display="none";
}