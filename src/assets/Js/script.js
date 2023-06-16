function formatState (state) {
    if (!state.id) { return state.text; }
    var $state = $(
      '<span><img src="' + $(state.element).attr('data-src') + '" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
  };
  $('select').select2({
    minimumResultsForSearch: Infinity,
    templateResult: formatState,
    templateSelection: formatState
  });