function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.getElementById("overlay");

  if (sidebar.style.left === "0px") {
    sidebar.style.left = "-280px";
    overlay.classList.add("hidden");
  } else {
    sidebar.style.left = "0px";
    overlay.classList.remove("hidden");
  }
}

function openAdmin() {

  const password = prompt("Enter Admin Password");

  if (password === "Delta@2026") {

    localStorage.setItem("coachingAdminAuth", "true");

    window.location.href = "adminc.html";

  } else {

    alert("Wrong Password ❌");

  }
}
const results = [

{
  image:"../images/topper1.jpeg",
  name:"Arushi Sinha",
  score:"96.4%"
},

{
  image:"../images/ishaan.jpeg",
  name:"Ishaan Qayanat",
  score:"419 (IIT JEE)"
},

{
  
  image:"../images/pallavi.jpeg",
  name:"Pallavi Kri",
  score:"455 (91%)"
},

{
  image:"../images/shatanshi.jpeg",
  name:"Shatanshi Kri",
  score:"435"
}

];

let current = 0;

function updateCard(){

 document.getElementById("resultImage").src =
 results[current].image;

 document.getElementById("resultName").textContent =
 results[current].name;

 document.getElementById("resultScore").textContent =
 results[current].score;

}

function nextResult(){

 current++;

 if(current >= results.length){
   current = 0;
 }

 updateCard();

}

function prevResult(){

 current--;

 if(current < 0){
   current = results.length - 1;
 }

 updateCard();

}
document
.getElementById("enquiryForm")
?.addEventListener("submit", submitEnquiry);

async function submitEnquiry(event) {

    event.preventDefault();

    const name =
        document.getElementById("parentName").value;

    const email =
        document.getElementById("email").value;

    const phone =
        document.getElementById("phone").value;

    const message =
        document.getElementById("message").value;

    const { error } = await supabaseClient
        .from("coaching_enquiries")
        .insert([
            {
                name: name,
                email: email,
                phone: phone,
                message: message
            }
        ]);

    if (error) {
        console.error(error);
        alert("Enquiry Failed ❌");
        return;
    }

    alert("Enquiry Sent Successfully ✅");

    document
        .getElementById("enquiryForm")
        .reset();
}