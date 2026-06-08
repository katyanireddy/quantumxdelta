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

async function loadAdmissions() {

  const table = document.getElementById("admissionsTable");

  const selectedClass =
  document.getElementById("classFilter")?.value || "";

const selectedDate =
  document.getElementById("dateFilter")?.value || "";

const searchTerm =
  document.getElementById("searchInput")?.value.toLowerCase() || "";

  const sortOrder =
  document.getElementById("sortOrder")?.value || "newest";
  

  let query = supabaseClient
  .from("demo_bookings")
  .select("*")
  .order("created_at", {
    ascending: sortOrder === "oldest"
  });

  if (selectedClass) {
    query = query.eq("class_name", selectedClass);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error);
    return;
  }
// Total Applications
document.getElementById("totalApps").textContent = data.length;

// Today's Applications
const today = new Date().toISOString().split("T")[0];

const todayCount = data.filter(row =>
  row.created_at.startsWith(today)
).length;

document.getElementById("todayApps").textContent = todayCount;

// Most Applied Class
const classCounts = {};

data.forEach(row => {
  const cls = row.class_name || "Unknown";

  classCounts[cls] = (classCounts[cls] || 0) + 1;
});

if (Object.keys(classCounts).length) {

  let maxCount = Math.max(...Object.values(classCounts));

  const topClasses = Object.keys(classCounts)
    .filter(cls => classCounts[cls] === maxCount);

  document.getElementById("topClass").textContent =
    topClasses.join(", ");

} else {

  document.getElementById("topClass").textContent = "-";

}

  
  let filteredData = data;

  if (selectedDate) {
    filteredData = data.filter(row => {
      return row.created_at.startsWith(selectedDate);
    });
  }
if (searchTerm) {
  filteredData = filteredData.filter(row =>
    (row.student_name || "").toLowerCase().includes(searchTerm) ||
    (row.parent_name || "").toLowerCase().includes(searchTerm) ||
    (row.phone || "").toLowerCase().includes(searchTerm) ||
    (row.class_name || "").toLowerCase().includes(searchTerm) ||
    (row.message || "").toLowerCase().includes(searchTerm)
  );
}
  table.innerHTML = "";
  if(filteredData.length === 0){
  table.innerHTML = `
  <tr>
    <td colspan="7" class="p-6 text-center text-gray-400">
      No Bookings Found
    </td>
  </tr>`;
  return;
}

  filteredData.forEach(row => {

    table.innerHTML += `
<tr class="border-b border-white/10 hover:bg-white/5">

<td class="p-4 whitespace-nowrap">
  ${row.student_name || ""}
</td>

<td class="p-4 whitespace-nowrap">
  ${row.parent_name || ""}
</td>

<td class="p-4 whitespace-nowrap">
  ${row.phone || ""}
</td>

<td class="p-4 whitespace-nowrap">
  ${row.class_name || ""}
</td>

<td class="p-4 break-words">
  ${row.message || ""}
</td>

<td class="p-4 whitespace-nowrap">
  ${new Date(row.created_at).toLocaleDateString()}
</td>

<td class="p-4 text-center">
  <button
    onclick="deleteBooking(${row.id})"
    class="bg-red-500 px-3 py-1 rounded-lg"
  >
    Delete
  </button>
</td>

</tr>

`;
  });

}



async function downloadCSV() {

    const { data, error } = await supabaseClient
        .from("demo_bookings")
        .select("*")
        .order("created_at", { ascending: false });
        

    if (error) {
        alert("Error downloading data");
        return;
    }

    const headers = [
  "Student Name",
  "Parent Name",
  "Phone",
  "Class",
  "Message",
  "Date"
];

    let csv = headers.join(",") + "\n";

    data.forEach(row => {
        csv += [
  `"${row.student_name || ""}"`,
  `"${row.parent_name || ""}"`,
  `"${row.phone || ""}"`,
  `"${row.class_name || ""}"`,
  `"${row.message || ""}"`,
  `"${row.created_at || ""}"`
].join(",") + "\n";
    });

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "delta_bookings.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}
async function deleteBooking(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmDelete) return;

  const { error } = await supabaseClient
    .from("demo_bookings")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Delete Failed ❌");
    console.log(error);
  } else {
    alert("Deleted Successfully ✅");
    loadAdmissions();
  }
}

async function loadEnquiries() {
    const table = document.getElementById("enquiriesTable");

    if (!table) {
        console.error("enquiriesTable not found");
        return;
    }

    const { data, error } = await supabaseClient
        .from("coaching_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

document.getElementById("totalEnquiries").textContent =
  data?.length || 0;



    if (error) {
        console.error(error);
        return;
    }

    table.innerHTML = "";

    data.forEach((row) => {
        const tr = document.createElement("tr");

        tr.className =
"border-b border-white/10 hover:bg-violet-500/10 transition-all duration-300";

        tr.innerHTML = `
<td class="p-4">${row.name || ""}</td>

<td class="p-4">${row.email || ""}</td>

<td class="p-4">${row.phone || ""}</td>

<td class="p-4">${row.message || ""}</td>

<td class="p-4">
${new Date(row.created_at).toLocaleDateString()}
</td>

<td class="p-4">
<button
class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
onclick="deleteEnquiry(${row.id})"
>
Delete
</button>
</td>
`;

        const deleteBtn = tr.querySelector("button");

        deleteBtn.addEventListener("click", () => {
            deleteEnquiry(row.id);
        });

        table.appendChild(tr);
    });
}

async function deleteEnquiry(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    const { error } = await supabaseClient
        .from("coaching_enquiries")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        alert("Delete Failed ❌");
        return;
    }

    alert("Deleted Successfully ✅");

    await loadEnquiries();
}

document.addEventListener("DOMContentLoaded", () => {
    loadEnquiries();
});
loadAdmissions();
loadEnquiries();

document
  .getElementById("classFilter")
  .addEventListener("change", loadAdmissions);

document
  .getElementById("dateFilter")
  .addEventListener("change", loadAdmissions);

document
  .getElementById("sortOrder")
  .addEventListener("change", loadAdmissions);

  document
  .getElementById("searchInput")
  .addEventListener("input", loadAdmissions);

function logoutAdmin() {

  localStorage.removeItem("coachingAdminAuth");

  window.location.href = "coaching.html";

}

function refreshDashboard() {

  document.getElementById("searchInput").value = "";

  document.getElementById("classFilter").value = "";

  document.getElementById("dateFilter").value = "";

  document.getElementById("sortOrder").value = "newest";

  loadAdmissions();

}
async function submitBooking(event) {

  event.preventDefault();

  const studentName =
    document.getElementById("studentName").value;

  const parentName =
    document.getElementById("parentName").value;

  const phone =
    document.getElementById("phone").value;

  const className =
    document.getElementById("className").value;

  const message =
    document.getElementById("message").value;

  const { error } = await supabaseClient
    .from("demo_bookings")
    .insert([
      {
        student_name: studentName,
        parent_name: parentName,
        phone: phone,
        class_name: className,
        message: message
      }
    ]);

  if (error) {
    console.error(error);
    alert("Booking Failed ❌");
    return;
  }

  alert("Demo Booked Successfully ✅");

  document.getElementById("bookingForm").reset();

  closeModal();

}