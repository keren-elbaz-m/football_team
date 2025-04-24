const buttons = document.querySelectorAll<HTMLButtonElement>(".tabs button");
const container = document.getElementById("teams-container");

type Team = {
    strBadge :string;
    strTeam :string;
}

buttons.forEach((button) => {
  button.addEventListener("click", async () => {
    const league = button.dataset.league;
    if (!league || !container) return;

    container.innerHTML = "<p>Loading...</p>";

    try {
      const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league)}`;
      const response = await fetch(url);
      const data : { teams: Team[] | null } = await response.json();

      if (data.teams && data.teams.length > 0) {
        container.innerHTML = data.teams
          .map(
            (team : Team) => `
              <div class="team">
                <img src="${team.strBadge}" alt="${team.strTeam}" width="50" />
                <span>${team.strTeam}</span>
              </div>
            `
          )
          .join("");
          buttons.forEach((btn)=> btn.classList.remove("active"));
          button.classList.add("active");
      } else {
        container.innerHTML = "<p>No teams found for this league.</p>";
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
      container.innerHTML = "<p>Error loading teams. Please try again.</p>";
    }
  });
});
