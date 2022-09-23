/* Select Elements */
const navLinks = document.querySelectorAll("ul li a");

// Mobile Menu
const mobileMenu = document.querySelector(".mobile-menu");

// Go Up Button
const goUpBtn = document.getElementById("go-up-btn");

// auto-typing Text
const autoTtypingText = document.querySelector(".auto-typing");

// skills Section
const skillsCategoryBtn = document.querySelectorAll(
  ".skills .left-side .skills-container .box"
);
const skillsCategories = document.querySelectorAll(
  ".skills .right-side .skills-container article"
);
const progressBar = document.querySelectorAll(
  ".skills .right-side .skills-container .box"
);
const progress = document.querySelectorAll(
  ".skills .right-side .skills-container .box span"
);
// Services
const viewInfoBtns = document.querySelectorAll(".view-more-btn");

// Works
const filterWorkBtn = document.querySelectorAll(".works .filter-btns button");
const allProectworks = document.querySelectorAll(
  ".works .works-container .project-box"
);
const viewDemoBtns = document.querySelectorAll(".view-demo-btn");

// testimonials Section
const testimonialContainer = document.querySelector(
  ".testimonial .testimonial-container .testimonials "
);
const leftTestimonialBtn = document.querySelector(".left-btn");
const rightTestimonialBtn = document.querySelector(".right-btn");
// Contact Form
const contactForm = document.querySelector("form");
const formInputs = document.querySelectorAll("form div .user-input");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
formInputs.forEach(function (input) {
  input.addEventListener("blur", function (e) {
    if (e.currentTarget.value.trim() !== "") {
      input.nextElementSibling.style.cssText = `top: 0;
      left: 15px;
      font-size: 12px;`;
    }
  });
});
/* */
/* */
/* */
/* */

const allSections = document.querySelectorAll(
  "body .right-side-container > section"
);
/* Functionality */
// AutoTyping Function
let text = autoTtypingText.textContent;
let textLength = text.length;
let index = 0;
let tyoingDuration = 350;
autoTtypingText.textContent = "";
function autoTypingFunc() {
  autoTtypingText.textContent += text[index];
  index++;
  let i = setTimeout(autoTypingFunc, tyoingDuration);
  if (index === textLength) {
    clearTimeout(i);
    index = 0;
    // To Wait 2s And Repaet The Function
    setTimeout(() => {
      autoTtypingText.textContent = "";
      setTimeout(autoTypingFunc, 0);
    }, 2000);
  }
}
autoTypingFunc();

// Mobile Menu Functionality
document.getElementById("toggle-btn").addEventListener("click", () => {
  mobileMenu.classList.add("show");
});
document.getElementById("close-menu-btn").addEventListener("click", () => {
  mobileMenu.classList.remove("show");
});

// Functioality to Side bar Links
function activeLinks() {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      allSections.forEach((section) => {
        if (section.id === link.getAttribute("href").slice(1)) {
          scrollTo({
            top: section.scrollTop,
            left: 0,
            behavior: "smooth",
          });
          console.log(section);
        }
      });
      e.currentTarget.classList.add("active");
      mobileMenu.classList.remove("show");
    });
  });
}
activeLinks();

// Functionality to Testimonials
let scrollAmout = 0;
let scrollPerClick = testimonialContainer.clientWidth;
rightTestimonialBtn.addEventListener("click", scrollRight);
leftTestimonialBtn.addEventListener("click", scrollLeft);

setInterval(scrollRight, 5000);

skillsCategoryBtn.forEach(function (categBtn) {
  categBtn.addEventListener("click", function (e) {
    skillsCategoryBtn.forEach(function (categBtn) {
      categBtn.classList.remove("active");
    });
    console.log(e.currentTarget.dataset.category);
    e.currentTarget.classList.add("active");
    const targetCategory = e.currentTarget.dataset.category;
    skillsCategories.forEach((skills) => {
      skills.classList.remove("active");
      if (skills.classList.contains(`${targetCategory}`)) {
        skills.classList.add("active");
      }
    });
  });
});

progressController();

// Function To change category of progress
function progressController() {
  progress.forEach(function (prog, index) {
    prog.style.width = `${progressBar[index].dataset.progress.slice(0, 2)}%`;
  });
}

// Function To sCroll Right
function scrollRight() {
  if (
    scrollAmout <=
    testimonialContainer.scrollWidth - testimonialContainer.clientWidth
  ) {
    testimonialContainer.scrollTo({
      top: "0",
      left: (scrollAmout += scrollPerClick),
      behavior: "smooth",
    });
  } else {
    scrollAmout = 0;
    testimonialContainer.scrollTo({
      top: "0",
      left: 0,
      behavior: "smooth",
    });
  }
}

// Function To sCroll Left
function scrollLeft() {
  if (scrollAmout > 0) {
    testimonialContainer.scrollTo({
      top: "0",
      left: (scrollAmout -= scrollPerClick),
      behavior: "smooth",
    });
  }
}

// Go Up Button
window.onscroll = function () {
  if (scrollY >= 600) {
    goUpBtn.style.display = "block";
  } else {
    goUpBtn.style.display = "none";
  }
};
goUpBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Functionality To Display Info About Services
function CreateShowMoreInfo(serviceName, serviceInfo, servicesList) {
  const ServiceMoreInfo = document.createElement("div");
  ServiceMoreInfo.className = `service-more-info`;

  const detailsContainer = document.createElement("div");
  detailsContainer.className = `details-container`;

  // Close Button
  const closeBtn = document.createElement("button");
  const closeBtnIcon = document.createElement("i");
  closeBtnIcon.classList.add("fa-solid", "fa-close");
  closeBtn.appendChild(closeBtnIcon);
  detailsContainer.appendChild(closeBtn);

  // Details Div Containes ServiceName, small paragraph
  const detailsDiv = document.createElement("div");
  detailsDiv.className = `details`;

  const serviceNameH2 = document.createElement("h2");
  serviceNameH2.appendChild(document.createTextNode(`${serviceName}`));
  const serviceInfoP = document.createElement("p");
  serviceInfoP.appendChild(document.createTextNode(`${serviceInfo}`));
  detailsDiv.appendChild(serviceNameH2);
  detailsDiv.appendChild(serviceInfoP);
  // apending to details Container
  detailsContainer.appendChild(detailsDiv);

  // list of benefits
  const list = document.createElement("ul");
  for (let i = 0; i < servicesList.length; i++) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${servicesList[i]}`));
    list.appendChild(li);
  }

  // apending to details Container
  detailsContainer.appendChild(list);

  // Appending DetailsContainer To Parent Div
  ServiceMoreInfo.appendChild(detailsContainer);

  // Appending Parent Div To Body
  document.body.appendChild(ServiceMoreInfo);
}
const servicesList = [
  {
    servInfo: "Services With more than one year of experience.",
    servArr: [
      "I develope the user interface.",
      "Web Page development",
      "Add Functionality To your website.",
      "make amazing website.",
    ],
  },
  {
    servInfo: "Services With Good, and Suitable Price.",
    servArr: [
      "offering good price.",
      "Web Page development",
      "Add Functionality To your website.",
      "make amazing website.",
    ],
  },
  {
    servInfo: "Services With Perfect Quality.",
    servArr: [
      "offering perfect quality.",
      "Web Page development",
      "Add Functionality To your website.",
      "make amazing website.",
    ],
  },
];
viewInfoBtns.forEach(function (btn, index) {
  btn.addEventListener("click", (e) => {
    const serviceTextName = e.currentTarget.previousElementSibling.textContent;
    const serviceTextInfo = servicesList[index].servInfo;
    const servList = servicesList[index].servArr;
    console.log(serviceTextName);
    CreateShowMoreInfo(serviceTextName, serviceTextInfo, servList);
    const servCloseBtn = document.querySelector(".details-container button");
    servCloseBtn.addEventListener("click", () => {
      servCloseBtn.parentElement.parentElement.remove();
    });
  });
});

// Functionality To Filter works Project
filterWorkBtn.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    filterWorkBtn.forEach(function (btn) {
      btn.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    const workCategory = e.currentTarget.dataset.category;
    allProectworks.forEach(function (project) {
      if (workCategory === "all") {
        project.classList.remove("hidden");
        project.style.cssText = `  animation: fadeIn 1s 1 ease-in-out;
        -webkit-animation: fadeIn 1s 1 ease-in-out;`;
      } else {
        if (project.dataset.category !== workCategory) {
          project.style.cssText = `  animation: fadeOut 1s 1 ease-in-out;
          -webkit-animation: fadeOut 1s 1 ease-in-out;
        `;
          setTimeout(() => {
            project.classList.add("hidden");
          }, 1000);
        } else {
          project.classList.remove("hidden");
          project.style.cssText = `  animation: fadeIn 1s 1 ease-in-out;
          -webkit-animation: fadeIn 1s 1 ease-in-out;
        `;
        }
      }
    });
    console.log(workCategory);
  });
});

const projectsList = [
  {
    date: "9 Aug 2021",
    technology: "HTML & CSS",
    role: "Front-End",
    demoLink: "http://",
  },
  {
    date: "2 Feb 2022",
    technology: "HTML & CSS",
    role: "Front-End",
    demoLink: "http://",
  },
  {
    date: "9 Aug 2022",
    technology: "HTML & CSS & JS",
    role: "Front-End",
    demoLink: "http://",
  },
  {
    date: "10 Oct 2021",
    technology: "HTML & CSS",
    technology: "HTML & CSS",
    role: "Front-End",
    demoLink: "http://",
  },
  {
    date: "9 Sep 2022",
    technology: "HTML & CSS",
    technology: "HTML & CSS & JS",
    role: "Front-End",
    demoLink: "http://",
  },
];

function CreateShowProjectInfo(
  imageSource,
  featuredName,
  textAboutProject,
  projectDate,
  projectTechnology,
  projectRole,
  projectLink
) {
  const projectInfoContainer = document.createElement("div");
  projectInfoContainer.className = `project-info-container`;

  const projectDetails = document.createElement("div");
  projectDetails.className = `project-details`;

  // Close Button
  const closeBtn = document.createElement("button");
  const closeBtnIcon = document.createElement("i");
  closeBtnIcon.classList.add("fa-solid", "fa-close");
  closeBtn.appendChild(closeBtnIcon);
  projectDetails.appendChild(closeBtn);

  // Details Div Containes ServiceName, small paragraph
  const detailsDiv = document.createElement("div");
  detailsDiv.className = `details`;

  // Image Side
  const imageDiv = document.createElement("div");
  imageDiv.className = `image`;
  const img = document.createElement("img");
  img.src = `${imageSource}`;
  imageDiv.appendChild(img);
  detailsDiv.appendChild(imageDiv);

  const rightSide = document.createElement("div");
  rightSide.className = `right-side`;
  const featured = document.createElement("p");
  featured.appendChild(document.createTextNode(`featured ${featuredName}`));

  const categ = document.createElement("h4");
  categ.appendChild(
    document.createTextNode(`The Service Provided For ${featuredName}`)
  );
  const aboutProject = document.createElement("p");
  aboutProject.appendChild(document.createTextNode(`${textAboutProject}`));

  // Appending First Info To Right Side
  rightSide.appendChild(featured);
  rightSide.appendChild(categ);
  rightSide.appendChild(aboutProject);

  const additionalInfoDiv = document.createElement("div");
  additionalInfoDiv.className = `info`;

  const createdDate = document.createElement("p");
  createdDate.appendChild(document.createTextNode(`Created- ${projectDate}`));

  const technologies = document.createElement("p");
  technologies.appendChild(
    document.createTextNode(`techbologies- ${projectTechnology}`)
  );

  const role = document.createElement("p");
  role.appendChild(document.createTextNode(`role- ${projectRole}`));

  const demoLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = `${projectLink}`;
  link.target = `_blank`;
  link.appendChild(document.createTextNode(`www.liveDemo.com`));
  demoLink.append(`Live Demo- ${link}`);

  // Appending To Additional Info
  additionalInfoDiv.appendChild(createdDate);
  additionalInfoDiv.appendChild(technologies);
  additionalInfoDiv.appendChild(role);
  additionalInfoDiv.appendChild(demoLink);

  // Appendtiong Additional Info to right Side
  rightSide.appendChild(additionalInfoDiv);

  // apending to detailsDiv
  detailsDiv.appendChild(rightSide);

  // Appending DetailsContainer To Parent Div
  projectDetails.appendChild(detailsDiv);
  projectInfoContainer.appendChild(projectDetails);

  // Appending Parent Div To Body
  document.body.appendChild(projectInfoContainer);
}

viewDemoBtns.forEach(function (btn, index) {
  btn.addEventListener("click", (e) => {
    // Get Image Source
    const imageSource =
      e.currentTarget.parentElement.previousElementSibling.firstElementChild
        .src;

    // Get Project Type
    const ptojectType = e.currentTarget.previousElementSibling.textContent;
    const aboutProject = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
Dolorem assumenda minima ea quia ipsam.`;

    // Get Project Additional Information
    const projectDate = projectsList[index].date;
    const projectTechnology = projectsList[index].technology;
    const projectRole = projectsList[index].role;
    const projectDemoLink = projectsList[index].demoLink;

    CreateShowProjectInfo(
      imageSource,
      ptojectType,
      aboutProject,
      projectDate,
      projectTechnology,
      projectRole,
      projectDemoLink
    );
    const workCloseBtn = document.querySelector(
      ".project-info-container .project-details button"
    );
    workCloseBtn.addEventListener("click", () => {
      workCloseBtn.parentElement.parentElement.remove();
    });
  });
});
