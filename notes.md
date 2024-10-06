<div class="carousel-container">
          <div class="carousel-top">
            <button class="button-key" id="move-left"><</button>
            <div class="carousel">
              <% for (let card of flashcard.cards) { %>
              <div class="flipcard-wrapper">
                <div class="flipcard" data-toggle-class="flipped">
                  <div class="flipcard-front"><h1><%= card.term %></h1></div>
                  <div class="flipcard-back">
                    <h1><%= card.definition %></h1>
                  </div>
                </div>
              </div>
              <% } %>
            </div>
            <button class="button-key" id="move-right">></button>
          </div>
          <div id="pIndicator"></div>
        </div>