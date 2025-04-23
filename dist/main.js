"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const buttons = document.querySelectorAll(".tabs button");
const container = document.getElementById("teams-container");
buttons.forEach((button) => {
    button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const league = button.dataset.league;
        if (!league || !container)
            return;
        container.innerHTML = "<p>Loading...</p>";
        try {
            const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${encodeURIComponent(league)}`;
            const response = yield fetch(url);
            const data = yield response.json();
            if (data.teams && data.teams.length > 0) {
                container.innerHTML = data.teams
                    .map((team) => `
              <div class="team">
                <img src="${team.strBadge}" alt="${team.strTeam}" width="50" />
                <span>${team.strTeam}</span>
              </div>
            `)
                    .join("");
            }
            else {
                container.innerHTML = "<p>No teams found for this league.</p>";
            }
        }
        catch (error) {
            console.error("Error fetching teams:", error);
            container.innerHTML = "<p>Error loading teams. Please try again.</p>";
        }
    }));
});
