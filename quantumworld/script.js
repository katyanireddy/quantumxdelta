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

  if (password === "Quantum@2026") {

    localStorage.setItem("adminAuth", "true");

    window.location.href = "admin.html";

  } else {

    alert("Wrong Password ❌");

  }

}

emailjs.init("ruCRtUmFWMOluuzY7");

// Admission Form
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
  admissionForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = admissionForm.querySelector('button[type="submit"]');
    btn.innerText = "Submitting...";
    btn.disabled = true;

    const templateParams = {
      student_name: document.getElementById('studentName').value,
      parent_name:  document.getElementById('parentName').value,
      email:        document.getElementById('email').value,
      phone:        document.getElementById('phone').value,
      class:        document.getElementById('class').value,
      dob:          document.getElementById('dob').value,
      address:      document.getElementById('address').value,
      additional:   document.getElementById('additional').value || 'N/A',
    };

    const { error } = await supabaseClient
      .from("admissions")
      .insert([templateParams]);

    if (error) {
      alert("DB Error: " + error.message);
      btn.innerText = "Submit Application";
      btn.disabled = false;
      return;
    }

    emailjs.send("service_oze1pfw", "template_3iattmp", templateParams)
      .then(() => {
        alert('Application submitted successfully!');
        admissionForm.reset();
      })
      .catch(err => alert('Saved but email failed: ' + err.text))
      .finally(() => {
        btn.innerText = "Submit Application";
        btn.disabled = false;
      });
  });
}

// Enquiry Form
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = enquiryForm.querySelector('button[type="submit"]');
    btn.innerText = "Sending...";
    btn.disabled = true;

    const templateParams = {
      parent_name: document.getElementById('parentName').value,
      email:       document.getElementById('email').value,
      phone:       document.getElementById('phone').value,
      message:     document.getElementById('message').value,
    };

    const { error } = await supabaseClient
      .from("enquiries")
      .insert([templateParams]);

    if (error) {
      alert("DB Error: " + error.message);
      btn.innerText = "Submit Enquiry";
      btn.disabled = false;
      return;
    }

    emailjs.send("service_oze1pfw", "template_s9s69ia", templateParams)
      .then(() => {
        alert('Enquiry submitted successfully!');
        enquiryForm.reset();
      })
      .catch(err => alert('Saved but email failed: ' + err.text))
      .finally(() => {
        btn.innerText = "Submit Enquiry";
        btn.disabled = false;
      });
  });
}