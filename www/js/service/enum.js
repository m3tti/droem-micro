angular.module('droem')
.factory('Enum', function() {
  function dreamTypeTranslation(dreamType) {
      if(dreamType === "DULL_DREAM") {
        return "Trübtraum";
      }
      if(dreamType === "LUCID_DREAM") {
        return "Klartraum";
      }
      if(dreamType === "PRELUCID_DREAM") {
        return "Präluzider Traum";
      }
      if(dreamType === "NIGHTMARE") {
        return "Albtraum";
      }

      return false;
    }

    function techniqueTranslation(technique) {
      if(technique === 'REALITY_CHECKS') {
        return "Realitäts Check";
      }
      if(technique === 'CRITICAL_AWARENESS') {
        return "Kritisches Bewustsein";
      }
      if(technique === 'AUTOSUGGESTION') {
        return "Autosugestion";
      }
      if(technique === 'DREAMINCUBATION') {
        return "Trauminkubation";
      }
      if(technique === 'RYTHM_NAPPING') {
        return "Rythm Napping";
      }
      if(technique === 'DREAMYOGA') {
        return "Traumyoga";
      }
      if(technique === 'MEDITATION') {
        return "Meditation";
      }
      if(technique === 'VISUALIZATION') {
        return "Visualisierung";
      }

      return technique;
    }

    return {
        technique_list: [
          'WILD',
          'DILD',
          'DEILD',
          'MILD',
          'SSILD',
          'VILD',
          'CAT',
          'REALITY_CHECKS',
          'CRITICAL_AWARENESS',
          'AUTOSUGGESTION',
          'DREAMINCUBATION',
          'RYTHM_NAPPING',
          'DREAMYOGA',
          'MEDITATION',
          'VISUALIZATION'
        ],

        dream_types: [
          'DULL_DREAM',
          'LUCID_DREAM',
          'PRELUCID_DREAM',
          'NIGHTMARE'
        ],

        translate: function(str) {
          var translation = dreamTypeTranslation(str);

          if(!translation) {
            translation = techniqueTranslation(str);
          }

          return translation;
        }
    };
});
