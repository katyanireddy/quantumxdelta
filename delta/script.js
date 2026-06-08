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

const supabaseUrl =
"https://qwwjrfhirhfoqwxravvm.supabase.co";

const supabaseKey =
"sb_publishable_WAUBqL0FWHBrfvMb2pnCOA_B0No9ufJ";

const supabaseClient =
window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const enquiryForm =
document.getElementById("enquiryForm");

if (enquiryForm) {

  enquiryForm.addEventListener(
    "submit",
    async function(e){

      e.preventDefault();

      const name =
      document.getElementById("parentName").value;

      const email =
      document.getElementById("email").value;

      const phone =
      document.getElementById("phone").value;

      const message =
      document.getElementById("message").value;

      const { error } =
      await supabaseClient
      .from("coaching_enquiries")
      .insert([
        {
          name,
          email,
          phone,
          message
        }
      ]);

      if(error){
        console.error(error);
        alert("Enquiry Failed ❌");
        return;
      }

      alert("Enquiry Sent Successfully ✅");

      enquiryForm.reset();

    }
  );

}


// ==========================
// MODALS
// ==========================

const modalTemplates = {

demo: `
<form id="bookingForm" onsubmit="submitBooking(event)" class="space-y-4">

<input
id="studentName"
type="text"
placeholder="Student Name"
class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white"
required
>

<input
id="parentName"
type="text"
placeholder="Parent Name"
class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white"
required
>

<div class="grid grid-cols-2 gap-3">

<select
id="className"
class="bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white"
required
>
<option value="">Select Class</option>
<option>LKG</option>
<option>UKG</option>
<option>Class I</option>
<option>Class II</option>
<option>Class III</option>
<option>Class IV</option>
<option>Class V</option>
<option>Class VI</option>
<option>Class VII</option>
<option>Class VIII</option>
<option>Class IX</option>
<option>Class X</option>
<option>Class XI</option>
<option>Class XII</option>
</select>

<input
id="phone"
type="tel"
placeholder="WhatsApp Number"
class="bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white"
required
>

</div>

<textarea
id="message"
rows="3"
placeholder="Message (Optional)"
class="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white"
></textarea>

<button
type="submit"
class="w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 text-white py-3 rounded-xl font-semibold"
>
Confirm Booking
</button>

</form>
`
};

// ==========================
// OPEN MODAL
// ==========================

function openModal(type) {

  const modalContainer =
  document.getElementById("modal-container");

  const modalContent =
  document.getElementById("modal-content");

  const modalBody =
  document.getElementById("modal-body");

  if (
    !modalContainer ||
    !modalContent ||
    !modalBody
  ) return;

  modalBody.innerHTML =
  modalTemplates[type];

  modalContainer.classList.remove(
    "hidden"
  );

  setTimeout(() => {

    modalContent.classList.remove(
      "scale-95",
      "opacity-0"
    );

    modalContent.classList.add(
      "scale-100",
      "opacity-100"
    );

  }, 10);

}

// ==========================
// CLOSE MODAL
// ==========================

function closeModal() {

  const modalContainer =
  document.getElementById("modal-container");

  const modalContent =
  document.getElementById("modal-content");

  if (!modalContainer || !modalContent)
    return;

  modalContent.classList.remove(
    "scale-100",
    "opacity-100"
  );

  modalContent.classList.add(
    "scale-95",
    "opacity-0"
  );

  setTimeout(() => {

    modalContainer.classList.add(
      "hidden"
    );

  }, 300);

}

