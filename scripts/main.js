// --- Navigation Logic ---
function initNavigation() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
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
        window.location.href = '3.html';
      });
    });
  }
  const editBtn = document.querySelector('.reserve-visit');
  if (editBtn) {
    editBtn.addEventListener('click', function () {
      window.location.href = '4.html';
    });
  }
  const continueReservationBtn = document.getElementById(
    'continue-reservation'
  );
  if (continueReservationBtn) {
    continueReservationBtn.addEventListener('click', function () {
      window.location.href = '3.html';
    });
  }
  const reserveLaterBtn = document.getElementById('reserve-later');
  if (reserveLaterBtn) {
    reserveLaterBtn.addEventListener('click', function () {
      window.location.href = 'index.html';
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
      window.location.href = 'index.html';
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
  /*
  const createAccountLink = document.getElementById('create-account-link');
  if (createAccountLink) {
    createAccountLink.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '5.html';
    });
  }
  */
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
}

// --- Dropdown Logic ---
function initCustomSelects() {
  document
    .querySelectorAll('.gh-custom-select')
    .forEach(function (customSelect) {
      const trigger = customSelect.querySelector('.gh-select-trigger');
      const options = customSelect.querySelector('.gh-select-options');
      const valueSpan = customSelect.querySelector('.gh-select-value');

      if (!trigger || !options || !valueSpan) {
        console.warn('Custom select is missing required elements:', customSelect);
        return;
      }

      const isMulti = customSelect.hasAttribute('data-multiselect');
      let isOpen = false;
      let selectedValues = [];

      function openDropdown() {
        customSelect.setAttribute('aria-expanded', 'true');
        options.hidden = false;
        isOpen = true;
        // Add event listeners for outside click and Escape only when open
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
      }
      function closeDropdown() {
        customSelect.setAttribute('aria-expanded', 'false');
        options.hidden = true;
        isOpen = false;
        document.removeEventListener('mousedown', handleOutsideClick);
        document.removeEventListener('keydown', handleEscape);
      }
      function handleOutsideClick(e) {
        if (!customSelect.contains(e.target)) {
          closeDropdown();
        }
      }
      function handleEscape(e) {
        if (isOpen && e.key === 'Escape') {
          closeDropdown();
        }
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
          if (!noneCheckbox) {
            return;
          }
          const otherCheckboxes = Array.from(allCheckboxes).filter(
            (cb) => !cb.classList.contains('gh-rep-none')
          );
          if (noneCheckbox.checked) {
            otherCheckboxes.forEach((cb) => {
              cb.checked = false;
              cb.disabled = true;
            });
          } else if (otherCheckboxes.some((cb) => cb.checked)) {
            noneCheckbox.checked = false;
            noneCheckbox.disabled = true;
            otherCheckboxes.forEach((cb) => {
              cb.disabled = false;
            });
          } else {
            noneCheckbox.disabled = false;
            otherCheckboxes.forEach((cb) => {
              cb.disabled = false;
            });
          }
        }
        function renderSelectedRepAttendees(options) {
          const selectedList = document.querySelector('.gh-selected-list');
          if (!selectedList) {
            return;
          }
          const noneCheckbox = options.querySelector('.gh-rep-none');
          const checked = options.querySelectorAll('.gh-checkbox:checked');
          selectedList.innerHTML = '';
          if (noneCheckbox && noneCheckbox.checked) {
            const div = document.createElement('div');
            div.textContent = 'NONE - No rep(s) attending';
            selectedList.appendChild(div);
            return;
          }
          checked.forEach((cb) => {
            if (!cb.classList.contains('gh-rep-none')) {
              const label = cb.parentElement
                .querySelector('.gh-option-bold')
                .textContent.trim();
              const div = document.createElement('div');
              div.innerHTML = `${label}<br><span class="material-symbols-outlined text-14 flex-center"> add </span><span class="gh-add-details">Add Details (Optional)</span>`;
              selectedList.appendChild(div);
            }
          });
        }
        function renderSelectedAttendees(expandedIndex) {
          const selectedLabels = Array.from(
            options.querySelectorAll('.gh-checkbox:checked')
          ).map((cb) =>
            cb.parentElement.querySelector('.gh-option-bold').textContent.trim()
          );
          const selectedValuesArr = Array.from(
            options.querySelectorAll('.gh-checkbox:checked')
          ).map((cb) =>
            cb.closest('.gh-select-option').getAttribute('data-value')
          );
          const selectedAttendeesList = document.getElementById(
            'selected-attendees-list'
          );
          if (selectedAttendeesList) {
            if (selectedLabels.length > 0) {
              selectedAttendeesList.innerHTML =
                `<div class=\"gh-selected-attendees-title\">Selected Attendees</div>` +
                selectedLabels
                  .map((name, i) => {
                    const isExpanded = expandedIndex === i;
                    return `<div class=\"gh-selected-attendee\">
                  <div class=\"gh-selected-attendee-name\">${name}</div>
                  <button class=\"gh-collapsible-trigger-id\" type=\"button\" tabindex=\"0\" aria-expanded=\"${isExpanded}\" aria-controls=\"attendee-details-form-${i}\">
                    <span class=\"material-symbols-outlined gh-collapsible-trigger__icon gh-toggle-icon\" aria-hidden=\"true\">${
                      isExpanded ? 'remove_circle_outline' : 'add_circle_outline'
                    }</span>
                   <span class=\"gh-collapsible-trigger__label\">Add Details (Optional)</span>
                  </button>
                  ${
                    isExpanded
                      ? `
                  <form class=\"gh-details-form\" id=\"attendee-details-form-${i}\" autocomplete=\"off\">
                    <label class=\"gh-label\" for=\"job-title-input-${i}\">Job Title</label>
                    <input type=\"text\" class=\"gh-input\" id=\"job-title-input-${i}\" />
                    <label class=\"gh-label\" for=\"badge-name-input-${i}\">* Name on Badge (How Attendee name will appear on badge)</label>
                    <input type=\"text\" class=\"gh-input\" required id=\"badge-name-input-${i}\" />
                    <label class=\"gh-label\" for=\"dietary-textarea-${i}\">Dietary Restrictions/Special Requirements <span class=\"gh-attendee-details-char-count\" id=\"dietary-count-${i}\">0/1200</span></label>
                    <textarea class=\"gh-textarea gh-attendee-details-textarea\" maxlength=\"1200\" id=\"dietary-textarea-${i}\"></textarea>
                    <label class=\"gh-label\" for=\"comments-textarea-${i}\">Comments <span class=\"gh-attendee-details-char-count\" id=\"comments-count-${i}\">0/1200</span></label>
                    <textarea class=\"gh-textarea gh-attendee-details-textarea\" maxlength=\"1200\" id=\"comments-textarea-${i}\" placeholder=\"e.g. I'm interested in...\"></textarea>
                    <div class='gh-flex-row'>
                      <div class='gh-label-group w-auto' role='radiogroup' aria-labelledby='prayer-time-label-${i}'>
                        <label class='gh-label' id='prayer-time-label-${i}' for='prayer-time-yes-${i}'><span>Prayer Time?</span></label>
                        <div class="gh-radio-label-yn-container">
                          <label class='gh-radio-label' for='prayer-time-yes-${i}'>
                            <input type='radio' id='prayer-time-yes-${i}' name='prayer-time-${i}' value='yes' class='gh-radio' aria-checked='false' aria-labelledby='prayer-time-label-${i} prayer-time-yes-label-${i}' />
                            <span class='gh-radio-label-text-yn' id='prayer-time-yes-label-${i}'>Yes</span>
                          </label>
                          <label class='gh-radio-label' for='prayer-time-no-${i}'>
                            <input type='radio' id='prayer-time-no-${i}' name='prayer-time-${i}' value='no' class='gh-radio' aria-checked='false' aria-labelledby='prayer-time-label-${i} prayer-time-no-label-${i}' />
                            <span class='gh-radio-label-text-yn' id='prayer-time-no-label-${i}'>No</span>
                          </label>
                        </div>
                      </div>
                      <div class="gh-label-group flex-1">
                        <label class='gh-label' for='prayer-time-input-${i}'><span>Enter prayer time</span></label>
                        <input type='text' id='prayer-time-input-${i}' class='gh-input' aria-label='Enter prayer time' />
                      </div>
                    </div>
                  </form>
                  `
                      : ''
                  }
                </div>`;
                  })
                  .join('');
            } else {
              selectedAttendeesList.innerHTML = '';
            }
          }
          // Add event listeners for details toggles
          Array.from(document.querySelectorAll('.gh-collapsible-trigger-id')).forEach(
            (btn, i) => {
              btn.addEventListener('click', function (e) {
                e.preventDefault();
                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                // If already expanded, collapse; otherwise expand this and collapse others
                renderSelectedAttendees(isExpanded ? null : Number(i));
                addDetailsCharCountListeners(Number(i));
              });
              btn.addEventListener('keydown', function (e) {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  const isExpanded =
                    btn.getAttribute('aria-expanded') === 'true';
                  renderSelectedAttendees(isExpanded ? null : Number(i));
                  addDetailsCharCountListeners(Number(i));
                }
              });
            }
          );
          // Add char count listeners if expanded
          if (typeof expandedIndex === 'number') {
            addDetailsCharCountListeners(expandedIndex);
          }
        }
        function addDetailsCharCountListeners(i) {
          const dietary = document.getElementById(`dietary-textarea-${i}`);
          const dietaryCount = document.getElementById(`dietary-count-${i}`);
          if (dietary && dietaryCount) {
            dietary.addEventListener('input', function () {
              dietaryCount.textContent = `${dietary.value.length}/1200`;
            });
          }
          const comments = document.getElementById(`comments-textarea-${i}`);
          const commentsCount = document.getElementById(`comments-count-${i}`);
          if (comments && commentsCount) {
            comments.addEventListener('input', function () {
              commentsCount.textContent = `${comments.value.length}/1200`;
            });
          }
        }
        let expandedAttendeeIndex = null;
        const optionElements = Array.from(
          options.querySelectorAll('.gh-select-option')
        );
        let focusedOptionIndex = -1;

        function focusOption(index) {
          if (optionElements.length === 0) {
            return;
          }
          if (index < 0) {
            index = 0;
          }
          if (index >= optionElements.length) {
            index = optionElements.length - 1;
          }
          optionElements.forEach((opt, i) => {
            if (i === index) {
              opt.classList.add('gh-option-focused');
              opt.setAttribute('tabindex', '0');
              opt.focus();
            } else {
              opt.classList.remove('gh-option-focused');
              opt.setAttribute('tabindex', '-1');
            }
          });
          focusedOptionIndex = index;
        }
        function clearOptionFocus() {
          optionElements.forEach((opt) => {
            opt.classList.remove('gh-option-focused');
            opt.setAttribute('tabindex', '-1');
          });
          focusedOptionIndex = -1;
        }

        options.addEventListener('click', function (e) {
          const option = e.target.closest('.gh-select-option');
          if (option) {
            const checkbox = option.querySelector('.gh-checkbox');
            checkbox.checked = !checkbox.checked;
            updateRepNoneLogic(customSelect, options);
            // Update trigger text
            const selectedLabels = Array.from(
              options.querySelectorAll('.gh-checkbox:checked')
            ).map((cb) =>
              cb.parentElement
                .querySelector('.gh-option-bold')
                .textContent.trim()
            );
            valueSpan.textContent =
              selectedLabels.length > 0
                ? selectedLabels.join(', ')
                : 'Select attendee name(s)';
            if (typeof renderSelectedAttendees === 'function') {
              expandedAttendeeIndex = null;
              renderSelectedAttendees(expandedAttendeeIndex);
            }
            renderSelectedRepAttendees(options);
            e.stopPropagation();
            // Do NOT close dropdown on option click for multi-select
          }
        });

        // Keyboard navigation for options
        options.addEventListener('keydown', function (e) {
          if (!isOpen) {
            return;
          }
          if (['ArrowDown', 'Down'].includes(e.key)) {
            e.preventDefault();
            focusOption(
              focusedOptionIndex < optionElements.length - 1
                ? focusedOptionIndex + 1
                : 0
            );
          } else if (['ArrowUp', 'Up'].includes(e.key)) {
            e.preventDefault();
            focusOption(
              focusedOptionIndex > 0
                ? focusedOptionIndex - 1
                : optionElements.length - 1
            );
          } else if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
              focusOption(
                focusedOptionIndex > 0
                  ? focusedOptionIndex - 1
                  : optionElements.length - 1
              );
            } else {
              focusOption(
                focusedOptionIndex < optionElements.length - 1
                  ? focusedOptionIndex + 1
                  : 0
              );
            }
          } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (focusedOptionIndex >= 0) {
              const opt = optionElements[focusedOptionIndex];
              const checkbox = opt.querySelector('.gh-checkbox');
              checkbox.checked = !checkbox.checked;
              updateRepNoneLogic(customSelect, options);
              // Update trigger text
              const selectedLabels = Array.from(
                options.querySelectorAll('.gh-checkbox:checked')
              ).map((cb) =>
                cb.parentElement
                  .querySelector('.gh-option-bold')
                  .textContent.trim()
              );
              valueSpan.textContent =
                selectedLabels.length > 0
                  ? selectedLabels.join(', ')
                  : 'Select attendee name(s)';
              if (typeof renderSelectedAttendees === 'function') {
                expandedAttendeeIndex = null;
                renderSelectedAttendees(expandedAttendeeIndex);
              }
              renderSelectedRepAttendees(options);
            }
          }
        });

        // When dropdown opens, focus first option
        trigger.addEventListener('keydown', function (e) {
          if ((e.key === 'Enter' || e.key === ' ') && !isOpen) {
            setTimeout(() => focusOption(0), 0);
          }
        });
        trigger.addEventListener('click', function () {
          if (!isOpen) {
            setTimeout(() => focusOption(0), 0);
          } else {
            clearOptionFocus();
          }
        });
        // Remove focus when dropdown closes
        customSelect.addEventListener('keydown', function (e) {
          if (isOpen && e.key === 'Escape') {
            clearOptionFocus();
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
              .forEach((opt) => opt.removeAttribute('aria-selected'));
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

      // Remove old global document click handler for this dropdown
      // (handled by openDropdown/closeDropdown now)
    });
}

// --- Attendee Form Logic ---
function initAttendeeForm() {
  // This function can be used to initialize any attendee form-specific logic if needed
}

// --- Tooltip Logic ---
function initTooltips() {
  // Tooltip.js - Simple, accessible tooltip for any element with .js-tooltip
  (function () {
    function createTooltipEl(text) {
      const tooltip = document.createElement('div');
      tooltip.className = 'gh-tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.textContent = text;
      document.body.appendChild(tooltip);
      return tooltip;
    }
    function positionTooltip(el, tooltip) {
      const rect = el.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      let top = rect.bottom + scrollY + 8;
      let left = rect.left + scrollX + rect.width / 2 - tooltip.offsetWidth / 2;
      if (left < 8) left = 8;
      if (left + tooltip.offsetWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltip.offsetWidth - 8;
      }
      if (top + tooltip.offsetHeight > window.innerHeight + scrollY) {
        top = rect.top + scrollY - tooltip.offsetHeight - 8;
      }
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
    function showTooltip(e) {
      const el = e.currentTarget;
      const text = el.getAttribute('data-tooltip') || el.getAttribute('title');
      if (!text) return;
      el.setAttribute('aria-describedby', 'gh-tooltip');
      el.setAttribute('data-tooltip', text);
      el.removeAttribute('title');
      const tooltip = createTooltipEl(text);
      tooltip.id = 'gh-tooltip';
      positionTooltip(el, tooltip);
      el._tooltip = tooltip;
    }
    function hideTooltip(e) {
      const el = e.currentTarget;
      el.removeAttribute('aria-describedby');
      if (el._tooltip) {
        el._tooltip.remove();
        el._tooltip = null;
      }
    }
    function handleTouch(e) {
      e.preventDefault();
      const el = e.currentTarget;
      if (el._tooltip) {
        hideTooltip(e);
      } else {
        showTooltip(e);
        setTimeout(() => hideTooltip({ currentTarget: el }), 2000);
      }
    }
    document.addEventListener('DOMContentLoaded', function () {
      const tooltips = document.querySelectorAll('.js-tooltip');
      tooltips.forEach((el) => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('focus', showTooltip);
        el.addEventListener('blur', hideTooltip);
        el.addEventListener('touchstart', handleTouch, { passive: false });
      });
    });
  })();
}

// --- Driving Fields Toggle Logic ---
function initDrivingFieldsToggle() {
  function setupDrivingFieldsToggle() {
    const dateLabel = document.getElementById('driving-arrival-date-label');
    const timeLabel = document.getElementById('driving-arrival-time-label');
    const dateInput = document.getElementById('driving-arrival-date-input');
    const timeInput = document.getElementById('driving-arrival-time-input');
    const yesRadio = document.getElementById('driving-yes');
    const noRadio = document.getElementById('driving-no');
    if (
      !dateLabel ||
      !timeLabel ||
      !dateInput ||
      !timeInput ||
      !yesRadio ||
      !noRadio
    ) {
      return;
    }
    function setDrivingFields(enabled) {
      if (enabled) {
        dateLabel.style.color = '#303028';
        timeLabel.style.color = '#303028';
        dateInput.disabled = false;
        timeInput.disabled = false;
      } else {
        dateLabel.style.color = '#D6D6D6';
        timeLabel.style.color = '#D6D6D6';
        dateInput.disabled = true;
        timeInput.disabled = true;
      }
    }
    setDrivingFields(false);
    yesRadio.addEventListener('change', function () {
      if (this.checked) {
        setDrivingFields(true);
      }
    });
    noRadio.addEventListener('change', function () {
      if (this.checked) {
        setDrivingFields(false);
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDrivingFieldsToggle);
  } else {
    setupDrivingFieldsToggle();
  }
}

// --- Char Count Logic ---
function initCharCount() {
  const projectFocus = document.getElementById('project-focus');
  const focusCount = document.getElementById('focus-count');
  if (projectFocus && focusCount) {
    projectFocus.addEventListener('input', function () {
      focusCount.textContent = `${projectFocus.value.length}/250`;
    });
  }

  const projectFocusCreate = document.getElementById('project-focus-create');
  const focusCountCreate = document.getElementById('focus-count-create');
  if (projectFocusCreate && focusCountCreate) {
    projectFocusCreate.addEventListener('input', function () {
      focusCountCreate.textContent = `${projectFocusCreate.value.length}/250`;
    });
  }
}

function initCharCountLimit() {
  document
    .querySelectorAll('textarea[data-count-id], input[data-count-id]')
    .forEach(function (el) {
      const countId = el.getAttribute('data-count-id');
      const countEl = document.getElementById(countId);
      if (!countEl) {
        return;
      }
      function updateCount() {
        const max = el.maxLength > 0 ? el.maxLength : 9999;
        const val = el.value || '';
        countEl.textContent = `${val.length}/${max}`;
      }
      el.addEventListener('input', updateCount);
      // Initialize on load
      updateCount();
    });
}

// --- Main Entry Point ---
function init() {
  initNavigation();
  initCustomSelects();
  initAttendeeForm();
  initTooltips();
  initDrivingFieldsToggle();
  initCharCount();
  initCharCountLimit();
  initAccountToggles();
  initCollapsibleToggles();
  ['edit-company-modal', 'edit-attendee-modal', 'edit-rep-modal'].forEach(
    function (id) {
      var dlg = document.getElementById(id);
      if (dlg && typeof dlg.close === 'function') {
        dlg.close();
      }
    }
  );
}

function initCollapsibleToggles() {
  document.querySelectorAll('.gh-collapsible-trigger').forEach(function(toggle) {
    var contentId = toggle.getAttribute('aria-controls');
    var content = document.getElementById(contentId);

    if (content) {
      toggle.addEventListener('click', function() {
        var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        content.hidden = !content.hidden;

        var icon = toggle.querySelector('.gh-toggle-icon');
        if (icon) {
          if (icon.textContent.includes('add')) {
            icon.textContent = icon.textContent.replace('add', 'remove');
          } else {
            icon.textContent = icon.textContent.replace('remove', 'add');
          }
        }
      });
    }
  });
}

function initAccountToggles() {
  const createAccountLink = document.getElementById('create-account-link');
  const createAccountForm = document.getElementById('create-account-form');

  if (createAccountLink && createAccountForm) {
    createAccountLink.addEventListener('click', function (e) {
      e.preventDefault();
      createAccountForm.hidden = !createAccountForm.hidden;
    });
  }
}

init();
