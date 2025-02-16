document.addEventListener("DOMContentLoaded", function () {
    const challengeForm = document.getElementById("challengeForm");
    const challengeNameInput = document.getElementById("challengeName");
    const challengeDescInput = document.getElementById("challengeDesc");
    const dailyChallengesRows = document.querySelectorAll(".container.mt-5 .row");
    const cancelBtn = document.getElementById("cancelBtn");

    // Function to load challenges from local storage
    function loadChallenges() {
        const savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];
        savedChallenges.forEach((challenge, index) => addChallengeToDOM(challenge.name, challenge.desc, index));
    }

    // Function to create and add a new challenge card to the DOM
    function addChallengeToDOM(challengeName, challengeDesc, index) {
        const challengeCard = document.createElement("div");
        challengeCard.classList.add("col-md-4");
        challengeCard.setAttribute("data-index", index); // Store index for deletion

        challengeCard.innerHTML = `
            <div class="challenge-card p-3 border rounded shadow-sm position-relative">
                <button class="btn-close position-absolute top-0 end-0 p-2 delete-btn" aria-label="Close"></button>
                <p class="fw-bold">${challengeName}</p>
                <p>${challengeDesc}</p>
                <button class="btn btn-primary">View Stats</button>
                <button class="btn btn-dark">Edit Profile</button>
            </div>
        `;

        // Insert into the first row (before existing challenges)
        if (dailyChallengesRows.length > 0) {
            dailyChallengesRows[0].prepend(challengeCard);
        }

        // Add event listener for deleting challenge
        challengeCard.querySelector(".delete-btn").addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this challenge?")) {
                deleteChallenge(index);
            }
        });
    }

    // Function to add new challenge and save to local storage
    function addChallenge(event) {
        event.preventDefault(); // Prevent form submission

        const challengeName = challengeNameInput.value.trim();
        const challengeDesc = challengeDescInput.value.trim();

        if (challengeName === "" || challengeDesc === "") {
            alert("Please fill in both fields.");
            return;
        }

        // Save to local storage
        const savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];
        savedChallenges.unshift({ name: challengeName, desc: challengeDesc });
        localStorage.setItem("challenges", JSON.stringify(savedChallenges));

        // Add to the DOM with correct index
        addChallengeToDOM(challengeName, challengeDesc, 0);

        // Clear input fields after adding the challenge
        challengeForm.reset();
    }

    // Function to delete a challenge
    function deleteChallenge(index) {
        let savedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];

        // Remove challenge from array
        savedChallenges.splice(index, 1);
        localStorage.setItem("challenges", JSON.stringify(savedChallenges));

        // Reload challenges (to refresh indexes)
        document.querySelectorAll(".col-md-4[data-index]").forEach(card => card.remove());
        loadChallenges();
    }

    // Function to clear the form when clicking cancel
    function clearForm() {
        challengeForm.reset();
    }

    // Load challenges from local storage when the page loads
    loadChallenges();

    // Event Listeners
    challengeForm.addEventListener("submit", addChallenge);
    cancelBtn.addEventListener("click", clearForm);
});
