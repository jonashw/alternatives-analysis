-- In the HTML build, point cross-links at the rendered page instead of the raw .md.
function Link(el)
  el.target = el.target:gsub("^https://alternatives%.jonashw%.dev/([%w%-]+)%.md$", "/%1/")
  return el
end
