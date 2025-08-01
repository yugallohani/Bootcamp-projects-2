// Created by Yugal Lohani for Assignment 15 – ID Card Generator with API

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const API_URL = 'https://dummyjson.com/users';

    const indianNames = [
        { firstName: "Aarav", lastName: "Sharma" }, { firstName: "Riya", lastName: "Patel" },
        { firstName: "Vivaan", lastName: "Singh" }, { firstName: "Ananya", lastName: "Kumar" },
        { firstName: "Aditya", lastName: "Das" }, { firstName: "Isha", lastName: "Verma" },
        { firstName: "Arjun", lastName: "Gupta" }, { firstName: "Diya", lastName: "Joshi" },
        { firstName: "Rohan", lastName: "Mehta" }, { firstName: "Priya", lastName: "Malhotra" },
        { firstName: "Kabir", lastName: "Yadav" }, { firstName: "Saanvi", lastName: "Chauhan" },
        { firstName: "Sai", lastName: "Reddy" }, { firstName: "Anika", lastName: "Nair" },
        { firstName: "Krishna", lastName: "Mishra" }, { firstName: "Zara", lastName: "Khan" },
        { firstName: "Ishaan", lastName: "Aggarwal" }, { firstName: "Myra", lastName: "Bansal" },
        { firstName: "Dhruv", lastName: "Goyal" }, { firstName: "Kiara", lastName: "Jain" },
        { firstName: "Reyansh", lastName: "Pandey" }, { firstName: "Ayesha", lastName: "Trivedi" },
        { firstName: "Mohammed", lastName: "Ali" }, { firstName: "Shanaya", lastName: "Kapoor" },
        { firstName: "Vihaan", lastName: "Thakur" }, { firstName: "Aarohi", lastName: "Pillai" },
        { firstName: "Aryan", lastName: "Rao" }, { firstName: "Navya", lastName: "Biswas" },
        { firstName: "Dev", lastName: "Saxena" }, { firstName: "Anvi", lastName: "Rajput" }
    ];

    async function apiData() {
        loader.style.display = 'block';
        errorMessage.style.display = 'none';
        try {
            let response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            showData(data.users);
        } catch (error) {
            console.error('Fetch error:', error);
            errorMessage.textContent = 'Failed to fetch user data. Please try again later.';
            errorMessage.style.display = 'block';
        } finally {
            loader.style.display = 'none';
        }
    }

    apiData();

    function showData(users) {
        cardContainer.innerHTML = ''; // Clear previous content
        users.forEach((element, index) => {
            // Get Indian name from the list
            const name = indianNames[index % indianNames.length];
            const fullName = `${name.firstName} ${name.lastName}`;
            
            // Generate email based on the name
            const generatedEmail = `${name.firstName.toLowerCase()}.${name.lastName.toLowerCase()}@krmu.ac.in`;

            // Create card elements
            const card = document.createElement("div");
            card.classList.add('card');

            // Card Header
            const cardHeader = document.createElement("div");
            cardHeader.classList.add('card-header');
            const image = document.createElement("img");
            image.setAttribute("src", element.image);
            image.setAttribute("alt", `Profile photo of ${fullName}`);
            const nameHeading = document.createElement("h2");
            nameHeading.textContent = fullName;
            cardHeader.appendChild(image);
            cardHeader.appendChild(nameHeading);

            // Card Body
            const cardBody = document.createElement("div");
            cardBody.classList.add('card-body');
            const emailPara = document.createElement("p");
            emailPara.innerHTML = `<strong>Email:</strong> ${generatedEmail}`;
            const agePara = document.createElement("p");
            agePara.innerHTML = `<strong>Age:</strong> ${element.age}`;
            const genderPara = document.createElement("p");
            genderPara.innerHTML = `<strong>Gender:</strong> ${element.gender}`;
            cardBody.appendChild(emailPara);
            cardBody.appendChild(agePara);
            cardBody.appendChild(genderPara);

            // Card Footer
            const cardFooter = document.createElement("div");
            cardFooter.classList.add('card-footer');
            const companyPara = document.createElement("p");
            companyPara.innerHTML = `<strong>Company:</strong> K R Mangalam University`;
            const addressPara = document.createElement("p");
            addressPara.innerHTML = `<strong>Address:</strong> Gurugram`;
            cardFooter.appendChild(companyPara);
            cardFooter.appendChild(addressPara);

            // Append all parts to the card
            card.appendChild(cardHeader);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            // Append card to the container
            cardContainer.appendChild(card);
        });
    }
});