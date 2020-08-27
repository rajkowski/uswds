function changeStylesheetRule(
  sheetId,
  selector,
  property,
  value
) {
  // Make the strings lowercase for matching
  selector = selector.toLowerCase();
  property = property.toLowerCase();
  value = value.toLowerCase();
  // Use or create a temporary stylesheet
  var stylesheetEl = document.getElementById(sheetId) || document.createElement('style');
  if (!stylesheetEl.id) {
    stylesheetEl.id = sheetId;
    document.head.appendChild(stylesheetEl);
  }
  var stylesheet = stylesheetEl.sheet;
  // Remove the existing rule to prepare for the updated rule
  if (stylesheet.cssRules) {
    for (var i = 0; i < stylesheet.cssRules.length; i++) {
      var rule = stylesheet.cssRules[i];
      if (rule.selectorText === selector) {
        stylesheet.deleteRule(i);
        break;
      }
    }
  } else {
    for (var i = 0; i < stylesheet.rules.length; i++) {
      var rule = stylesheet.rules[i];
      if (rule.selectorText === selector) {
        stylesheet.removeRule(i);
        break;
      }
    }
  }
  // Add the new/updated rule
  if (stylesheet.cssRules) {
    stylesheet.insertRule(selector + " { " + property + ": " + value + "; }", 0);
  } else {
    stylesheet.addRule(selector, property + ": " + value, 0);
  }
}

module.exports = changeStylesheetRule;
