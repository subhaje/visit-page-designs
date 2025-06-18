document.getElementById('year').textContent = new Date().getFullYear();

const startReservationBtn = document.getElementById('start-reservation');
if (startReservationBtn) {
  startReservationBtn.addEventListener('click', function () {
    window.location.href = '2.html';
  });
}

const reserveBtns = document.querySelectorAll('.gh-btn-table');
if (reserveBtns.length > 0) {
  reserveBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // For now, show a mock alert. Replace with navigation to 3.html as needed.
      //alert('Reservation started for this date! (Connect to next step)');
      // window.location.href = '3.html';
    });
  });
}

const editBtn = document.querySelector('.reserve-visit');
if (editBtn) {
  editBtn.addEventListener('click', function () {
    // For now, show a mock alert. Replace with navigation to 4.html as needed.
    //// alert('Continue/Edit reservation (Connect to next step)');
    window.location.href = '4.html';
  });
}

const continueReservationBtn = document.getElementById('continue-reservation');
if (continueReservationBtn) {
  continueReservationBtn.addEventListener('click', function () {
    window.location.href = '3.html';
  });
}

const reserveLaterBtn = document.getElementById('reserve-later');
if (reserveLaterBtn) {
  reserveLaterBtn.addEventListener('click', function () {
    //alert('Reservation saved for later! (Connect to save logic)');
    // window.location.href = 'index.html';
  });
}

const reserveAccountBtn = document.getElementById('reserve-account');
if (reserveAccountBtn) {
  reserveAccountBtn.addEventListener('click', function () {
    window.location.href = '5.html';
  });
}

const backLink = document.getElementById('back-link');
if (backLink) {
  backLink.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '2.html';
  });
}

const saveLaterBtn = document.getElementById('save-later');
if (saveLaterBtn) {
  saveLaterBtn.addEventListener('click', function () {
    //alert('Progress saved for later! (Connect to save logic)');
    // window.location.href = 'index.html';
  });
}

const saveAddAttendeeBtn = document.getElementById('save-add-attendee');
if (saveAddAttendeeBtn) {
  saveAddAttendeeBtn.addEventListener('click', function () {
    window.location.href = '6.html';
  });
}

const saveAddRepBtn = document.getElementById('save-add-rep');
if (saveAddRepBtn) {
  saveAddRepBtn.addEventListener('click', function () {
    window.location.href = '7.html';
  });
}

const createAccountLink = document.getElementById('create-account-link');
if (createAccountLink) {
  createAccountLink.addEventListener('click', function (e) {
    e.preventDefault();
    //alert('Create customer account (Connect to account creation flow)');
  });
}

// Back link for 5.html
if (window.location.pathname.endsWith('5.html')) {
  const backLink = document.getElementById('back-link');
  if (backLink) {
    backLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '4.html';
    });
  }
}

// Custom Select Dropdown (Reusable)
document.querySelectorAll('.gh-custom-select').forEach(function (customSelect) {
  const trigger = customSelect.querySelector('.gh-select-trigger');
  const options = customSelect.querySelector('.gh-select-options');
  const valueSpan = customSelect.querySelector('.gh-select-value');
  const isMulti = customSelect.hasAttribute('data-multiselect');
  let isOpen = false;
  let selectedValues = [];

  function openDropdown() {
    customSelect.setAttribute('aria-expanded', 'true');
    options.hidden = false;
    isOpen = true;
  }
  function closeDropdown() {
    customSelect.setAttribute('aria-expanded', 'false');
    options.hidden = true;
    isOpen = false;
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  if (isMulti) {
    // Multi-select logic
    function updateRepNoneLogic(customSelect, options) {
      const isRepDropdown = customSelect.id === 'rep-attendee-names-select';
      if (!isRepDropdown) return;
      const allCheckboxes = options.querySelectorAll('.gh-checkbox');
      const noneCheckbox = options.querySelector('.gh-rep-none');
      const otherCheckboxes = Array.from(allCheckboxes).filter(
        cb => !cb.classList.contains('gh-rep-none')
      );
      if (noneCheckbox.checked) {
        otherCheckboxes.forEach(cb => {
          cb.checked = false;
          cb.disabled = true;
        });
      } else if (otherCheckboxes.some(cb => cb.checked)) {
        noneCheckbox.checked = false;
        noneCheckbox.disabled = true;
        otherCheckboxes.forEach(cb => {
          cb.disabled = false;
        });
      } else {
        noneCheckbox.disabled = false;
        otherCheckboxes.forEach(cb => {
          cb.disabled = false;
        });
      }
    }
    function renderSelectedRepAttendees(options) {
      const selectedList = document.querySelector('.gh-selected-list');
      const noneCheckbox = options.querySelector('.gh-rep-none');
      const checked = options.querySelectorAll('.gh-checkbox:checked');
      selectedList.innerHTML = '';
      if (noneCheckbox && noneCheckbox.checked) {
        const div = document.createElement('div');
        div.textContent = 'NONE - No rep(s) attending';
        selectedList.appendChild(div);
        return;
      }
      checked.forEach(cb => {
        if (!cb.classList.contains('gh-rep-none')) {
          const label = cb.parentElement.querySelector('.gh-option-bold').textContent.trim();
          const div = document.createElement('div');
          div.innerHTML = `${label}<br><span class="gh-add-details">+ Add Details (Optional)</span>`;
          selectedList.appendChild(div);
        }
      });
    }
    function renderSelectedAttendees(expandedIndex) {
      const selectedLabels = Array.from(options.querySelectorAll('.gh-checkbox:checked')).map(cb =>
        cb.parentElement.querySelector('.gh-option-bold').textContent.trim()
      );
      const selectedValuesArr = Array.from(options.querySelectorAll('.gh-checkbox:checked')).map(
        cb => cb.closest('.gh-select-option').getAttribute('data-value')
      );
      const selectedAttendeesList = document.getElementById('selected-attendees-list');
      if (selectedAttendeesList) {
        if (selectedLabels.length > 0) {
          selectedAttendeesList.innerHTML =
            `<div class=\"gh-selected-attendees-title\">Selected Attendees</div>` +
            selectedLabels
              .map(
                (name, i) =>
                  `<div class=\"gh-selected-attendee\">
                <span class=\"gh-selected-attendee-name\">${name}</span>
                <span class=\"gh-add-details-link\" tabindex=\"0\" data-index=\"${i}\">+ Add Details (Optional)</span>
                ${
                  expandedIndex === i
                    ? `
                <form class=\"gh-attendee-details-form\" autocomplete=\"off\">
                  <label class=\"gh-attendee-details-label\">Job Title</label>
                  <input type=\"text\" class=\"gh-attendee-details-input\" />
                  <label class=\"gh-attendee-details-label\">* Name on Badge (How Attendee name will appear on badge)</label>
                  <input type=\"text\" class=\"gh-attendee-details-input\" required />
                  <label class=\"gh-attendee-details-label\">Dietary Restrictions/Special Requirements <span class=\"gh-attendee-details-char-count\" id=\"dietary-count-${i}\">0/1200</span></label>
                  <textarea class=\"gh-attendee-details-textarea\" maxlength=\"1200\" id=\"dietary-textarea-${i}\"></textarea>
                  <label class=\"gh-attendee-details-label\">Comments <span class=\"gh-attendee-details-char-count\" id=\"comments-count-${i}\">0/1200</span></label>
                  <textarea class=\"gh-attendee-details-textarea\" maxlength=\"1200\" id=\"comments-textarea-${i}\" placeholder=\"e.g. I'm interested in...\"></textarea>
                  <div class=\"gh-attendee-details-prayer-time\">
                    <span class=\"gh-attendee-details-label\">Prayer Time?</span>
                    <div class=\"gh-attendee-details-radio-group\">
                      <label class=\"gh-attendee-details-radio\"><input type=\"radio\" name=\"prayer-${i}\" value=\"yes\" /> Yes</label>
                      <label class=\"gh-attendee-details-radio\"><input type=\"radio\" name=\"prayer-${i}\" value=\"no\" /> No</label>
                    </div>
                    <input type=\"text\" class=\"gh-attendee-details-input\" style=\"max-width: 180px;\" placeholder=\"Enter prayer time\" />
                  </div>
                </form>
                `
                    : ''
                }
              </div>`
              )
              .join('');
        } else {
          selectedAttendeesList.innerHTML = '';
        }
      }
      // Add event listeners for details toggles
      Array.from(document.querySelectorAll('.gh-add-details-link')).forEach(link => {
        link.addEventListener('click', function () {
          renderSelectedAttendees(Number(link.getAttribute('data-index')));
          addDetailsCharCountListeners(Number(link.getAttribute('data-index')));
        });
      });
      // Add char count listeners if expanded
      if (typeof expandedIndex === 'number') {
        addDetailsCharCountListeners(expandedIndex);
      }
    }
    function addDetailsCharCountListeners(idx) {
      const dietary = document.getElementById(`dietary-textarea-${idx}`);
      const dietaryCount = document.getElementById(`dietary-count-${idx}`);
      if (dietary && dietaryCount) {
        dietary.addEventListener('input', function () {
          dietaryCount.textContent = `${dietary.value.length}/1200`;
        });
      }
      const comments = document.getElementById(`comments-textarea-${idx}`);
      const commentsCount = document.getElementById(`comments-count-${idx}`);
      if (comments && commentsCount) {
        comments.addEventListener('input', function () {
          commentsCount.textContent = `${comments.value.length}/1200`;
        });
      }
    }
    let expandedAttendeeIndex = null;
    options.addEventListener('click', function (e) {
      const option = e.target.closest('.gh-select-option');
      if (option) {
        const checkbox = option.querySelector('.gh-checkbox');
        checkbox.checked = !checkbox.checked;
        updateRepNoneLogic(customSelect, options);
        // Update trigger text
        const selectedLabels = Array.from(options.querySelectorAll('.gh-checkbox:checked')).map(
          cb => cb.parentElement.querySelector('.gh-option-bold').textContent.trim()
        );
        valueSpan.textContent =
          selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Select attendee name(s)';
        if (typeof renderSelectedAttendees === 'function') {
          expandedAttendeeIndex = null;
          renderSelectedAttendees(expandedAttendeeIndex);
        }
        renderSelectedRepAttendees(options);
        e.stopPropagation();
      }
    });
    // Initial state
    updateRepNoneLogic(customSelect, options);
    if (typeof renderSelectedAttendees === 'function') {
      renderSelectedAttendees(expandedAttendeeIndex);
    }
    renderSelectedRepAttendees(options);
  } else {
    // Single-select logic
    options.addEventListener('click', function (e) {
      const option = e.target.closest('.gh-select-option');
      if (option) {
        valueSpan.textContent = option.textContent.trim();
        options
          .querySelectorAll('.gh-select-option')
          .forEach(opt => opt.removeAttribute('aria-selected'));
        option.setAttribute('aria-selected', 'true');
        closeDropdown();
      }
    });
  }

  // Keyboard navigation
  customSelect.addEventListener('keydown', function (e) {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
      openDropdown();
      e.preventDefault();
    } else if (isOpen && e.key === 'Escape') {
      closeDropdown();
      e.preventDefault();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!customSelect.contains(e.target)) {
      closeDropdown();
    }
  });
});

// Additional Account Info Toggle (5.html)
const additionalInfoToggle = document.getElementById('additional-info-toggle');
const additionalInfoFields = document.getElementById('additional-info-fields');
const additionalInfoIcon = additionalInfoToggle
  ? additionalInfoToggle.querySelector('.gh-toggle-icon')
  : null;
const additionalInfoLabel = additionalInfoToggle
  ? additionalInfoToggle.querySelector('.gh-additional-info-label')
  : null;
if (additionalInfoToggle && additionalInfoFields && additionalInfoIcon && additionalInfoLabel) {
  function setExpanded(expanded) {
    additionalInfoToggle.setAttribute('aria-expanded', expanded);
    additionalInfoFields.hidden = !expanded;
    additionalInfoIcon.textContent = expanded ? 'remove' : 'add';
  }
  function toggleAdditionalInfo() {
    const expanded = additionalInfoToggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  }
  additionalInfoIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleAdditionalInfo();
  });
  additionalInfoLabel.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleAdditionalInfo();
  });
  additionalInfoToggle.addEventListener('keydown', function (e) {
    if (e.target === additionalInfoIcon && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      toggleAdditionalInfo();
    }
  });
}

// Char count for project focus textarea
const projectFocus = document.getElementById('project-focus');
const focusCount = document.getElementById('focus-count');
if (projectFocus && focusCount) {
  projectFocus.addEventListener('input', function () {
    focusCount.textContent = `${projectFocus.value.length}/250`;
  });
}

const saveAddTravelBtn = document.getElementById('save-add-travel');
if (saveAddTravelBtn) {
  saveAddTravelBtn.addEventListener('click', function () {
    window.location.href = '8.html';
  });
}

const saveReviewSummaryBtn = document.getElementById('save-review-summary');
if (saveReviewSummaryBtn) {
  saveReviewSummaryBtn.addEventListener('click', function () {
    window.location.href = '9.html';
  });
}
