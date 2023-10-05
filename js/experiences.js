'use strict';

export default class Experiences {
  _experiences = [
    {
      title: 'Event Assistant',
      company: 'Huawei',
      startDate: new Date(2022, 1), // February 2022
      endDate: new Date(2022, 2), // March 2022
      description: [
        'Assisted and communicated with multi-lingual customers (English, Chinese, and Spanish).',
        "Provided on-site support to the company's clients during the congress.",
      ],
      skills: ['Communication', 'Customer service', 'Spoken Languages'],
    },
  ];

  _displayClickedTab() {
    let previousTab = 0;
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const currentTab = parseInt(e.target.id.match(/\d+/));
        if (currentTab !== previousTab) {
          // Hide previous tab
          document.querySelector(`#tab-${previousTab}`).setAttribute('aria-selected', false);
          document.querySelector(`#content-${previousTab}`).setAttribute('aria-selected', false);
          // Show current Tab
          document.querySelector(`#tab-${currentTab}`).setAttribute('aria-selected', true);
          document.querySelector(`#content-${currentTab}`).setAttribute('aria-selected', true);
          previousTab = currentTab;
        }
      });
    });
  }

  _getTabHtml(experience, isDisplayed, i) {
    const tabHtml = `<button id='tab-${i}' class='tab' type='button' aria-selected=${isDisplayed}>
    <span tab='${i}'>${experience.company.toUpperCase()}</span>
    </button>
    `;
    return tabHtml;
  }

  _getExperienceHtml(experience, isDisplayed, i) {
    const getHtmlList = (acc, elem) => {
      return acc + `<li>${elem}</li>`;
    };

    const getMonthFromDate = (date) => {
      return date.toLocaleString('default', {month: 'short'});
    };

    const getDurationFromDates = (startDate, endDate) => {
      const startMonth = getMonthFromDate(startDate).toUpperCase();
      const endMonth = getMonthFromDate(endDate).toUpperCase();
      return `${startMonth} ${startDate.getFullYear()} - ${endMonth} ${endDate.getFullYear()}`;
    };

    const pointsHtml = experience.description.reduce(getHtmlList, '');
    const skillsHtml =
      experience.skills.length === 0
        ? ''
        : `<span class='job-skills'><span class='light-slate'>Skills:</span> ${experience.skills.join(
            ' - ',
          )}</span>`;
    const experienceHtml = `<div id='content-${i}' class='experience-content' aria-selected=${isDisplayed}>
    <p>
      <span class='job-title'>${experience.title} @</span>
      <span class='job-company'>${experience.company}</span>
      <div class='job-duration'>${getDurationFromDates(
        experience.startDate,
        experience.endDate,
      )}</div>
      <ul class='job-description'>${pointsHtml}</ul>
      ${skillsHtml}
    </p>
  </div>
  `;
    return experienceHtml;
  }

  render() {
    const [tabsHtml, expsHtml] = this._experiences.reduce(
      ([tabsHtml, expsHtml], exp, i) => {
        const isDisplayed = i === 0 ? 'true' : 'false';
        const tabHtml = this._getTabHtml(exp, isDisplayed, i);
        const expHtml = this._getExperienceHtml(exp, isDisplayed, i);
        return [tabsHtml + tabHtml, expsHtml + expHtml];
      },
      ['', ''],
    );
    document.querySelector('#experience-tab').insertAdjacentHTML('afterbegin', tabsHtml);
    document
      .querySelector('#experience-content-container')
      .insertAdjacentHTML('afterbegin', expsHtml);

    this._displayClickedTab();
  }
}
