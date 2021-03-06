$(function(){
  
  var _status = {
    calculatorType: 'easy'
  }

  var _values = {
    en_level : {
      jDom: $('#en_level')
    },
    en_deffense : {
      jDom: $('#en_deffense')
    },
    character_level : {
      jDom: $('#character_level')
    },
    skill_power : {
      jDom: $('#skill_power')
    },
    character_attack : {
      jDom: $('#character_attack')
    },
    attribute_attack : {
      jDom: $('#attribute_attack')
    },
    tribe_attack : {
      jDom: $('#tribe_attack')
    },
    property_attack : {
      jDom: $('#property_attack')
    },
    fix_attack : {
      jDom: $('#fix_attack')
    },
    ph_critical_attack : {
      jDom: $('#ph_critical_attack')
    },
    ma_amplify : {
      jDom: $('#ma_amplify')
    }
  };

  // intを返す
  function returnInt(val) {
    return parseInt(val,10);
  }

  /* 
   * 計算ロジック郡
  */
  
  // レベル差補正
  function levelRevise() {
    var levelRevise = 0;
    
    var enLevelVal = returnInt(_values.en_level.jDom.val());
    var characterLevelVal = returnInt(_values.character_level.jDom.val());
    
    return levelRevise;
  }
  
  // 基本ダメージ
  function baseDamage() {
    var _baseDamage = 0;
    
    var skillPowerVal = returnInt(_values.skill_power.jDom.val());
    var characterAttackVal = returnInt(_values.character_attack.jDom.val());
    var enDeffenseVal = returnInt(_values.en_deffense.jDom.val());
    
    _baseDamage = (skillPowerVal + characterAttackVal + 0 ) - (enDeffenseVal*levelRevise()); //(100%+T0),属性抵抗 必要
    return _baseDamage;
  }
  
  // クリティカルダメージ
  function criticalDamage(criticalFlag) {
    var _criticalDamage = 0;
    var phCriticalAttackVal = returnInt(_values.ph_critical_attack.jDom.val());
    var attributeAttackVal = returnInt(_values.attribute_attack.jDom.val());
    
    // 追加属性攻撃,追加種族ダメージ　必要
    if ( criticalFlag ) {
      _criticalDamage = phCriticalAttackVal + attributeAttackVal;
    } else {
      _criticalDamage = attributeAttackVal;
    }
    
    return _criticalDamage;
  }
  
  // 特別な攻撃力加算
  function specialAttack() {
    var propertyAttackVal = returnInt(_values.property_attack.jDom.val());
    var _scperialDamage = 1 + (propertyAttackVal/100); // (100%+T1),(100%+属性相性),(100%+タイプ相性) 必要;
    
    return _scperialDamage;
  }
  
  // 通常ダメージ計算ロジック
  function damageCalculator(criticalFlag) {
    var _damage = 0;
    
    var tribeAttackVal = returnInt(_values.tribe_attack.jDom.val());
    
    var fixAttackVal = returnInt(_values.fix_attack.jDom.val());
    
    var maAmplifyVal = returnInt(_values.ma_amplify.jDom.val());
    
    if ( criticalFlag ) {
      _damage = ((baseDamage() * 1.5 + criticalDamage(criticalFlag)) * specialAttack()) + returnInt(fixAttackVal);
    } else {
      _damage = ((baseDamage() + criticalDamage(criticalFlag)) * specialAttack()) + returnInt(fixAttackVal);  
    }
    
    return Math.round(_damage);
  }

  // 入力値に問題がないか確認する
  function defaultValueValidation() {
    
  }

  // デフォルトの値をセットする
  function defaultValueSet() {
    defaultValueValidation();
    
    var $enLevelVal = _values.en_level.jDom;
    var $enDeffenseVal = _values.en_deffense.jDom;
    var $characterLevelVal = _values.character_level.jDom;
    var $skillPowerVal = _values.skill_power.jDom;
    var $characterAttackVal = _values.character_attack.jDom;
    var $attributeAttackVal = _values.attribute_attack.jDom;
    var $tribeAttackVal = _values.tribe_attack.jDom;
    var $propertyAttackVal = _values.property_attack.jDom;
    var $fixAttackVal = _values.fix_attack.jDom;
    var $phCriticalAttackVal = _values.ph_critical_attack.jDom;
    var $maAmplifyVal = _values.ma_amplify.jDom;
    
    if ( !$enLevelVal.val() ) $enLevelVal.val(1);
    if ( !$enDeffenseVal.val() ) $enDeffenseVal.val(1);
    if ( !$characterLevelVal.val() ) $characterLevelVal.val(1);
    if ( !$skillPowerVal.val() ) $skillPowerVal.val(1);
    if ( !$characterAttackVal.val() ) $characterAttackVal.val(1);
    if ( !$attributeAttackVal.val() ) $attributeAttackVal.val(1);
    if ( !$tribeAttackVal.val() ) $tribeAttackVal.val(1);
    if ( !$propertyAttackVal.val() ) $propertyAttackVal.val(0);
    if ( !$fixAttackVal.val() ) $fixAttackVal.val(0);
    if ( !$phCriticalAttackVal.val() ) $phCriticalAttackVal.val(1);
    if ( !$maAmplifyVal.val() ) $maAmplifyVal.val(1);
  }
  
  // 関係ないインプットを消す
  function hiddenInputRelation() {
    _values.en_level.jDom.addClass('js-hide');
    _values.en_deffense.jDom.addClass('js-hide');
    _values.character_level.jDom.addClass('js-hide');
    _values.tribe_attack.jDom.addClass('js-hide');
    _values.fix_attack.jDom.addClass('js-hide');
  }
  // インプットを出す
  function showInputRelation() {
    _values.en_level.jDom.removeClass('js-hide');
    _values.en_deffense.jDom.removeClass('js-hide');
    _values.character_level.jDom.removeClass('js-hide');
    _values.tribe_attack.jDom.removeClass('js-hide');
    _values.fix_attack.jDom.removeClass('js-hide');
  }
  
  // 物理用インプット
  function showInputPh() {
    $('#phMode').removeClass('js-hide');
    $('#maMode').addClass('js-hide');
  }
  // 魔法用インプット
  function showInputMa() {
    $('#phMode').addClass('js-hide');
    $('#maMode').removeClass('js-hide');
  }
  
  // 計算タイプ判別
  function caluculatorType() {
    var $typeInput = $('#calculatorType').find('input:checked');
    var typeValue = $typeInput.val();
    if ( typeValue === 'detail' ) {
      _status.calculatorType = 'details';
      showInputRelation();
    } else {
      _status.calculatorType = 'easy';
      hiddenInputRelation();
    }
  }
  
  // 攻撃タイプ判別
  function attackType() {
    var $attackInput = $('#attackType').find('input:checked');
    var typeValue = $attackInput.val();
    if ( typeValue === 'ph' ) {
      _status.attackType = 'ph';
      showInputPh();
    } else {
      _status.attackType = 'ma';
      showInputMa();
    }
  }

  // 初期化
  function init() {
    
    $('#calculatorType input').on('click',function() {
      caluculatorType();
    });
    
    $('#attackType input').on('click',function() {
      attackType();
    });
    
    
    
    $('#calculatorButton').on('click',function() {
      defaultValueSet();
      
      $('#totalScore').html(damageCalculator());
      $('#totalCritical').html(damageCalculator(true));
    });
  }

  // 実行
  init();
  /*
  (
  (((スキル威力+攻撃力)+(ランダム0%～100%×魔法増幅) )×(100%+T0))
  －
  (((防御力-防御力デバフ)×(100%+レベル補正)+(属性抵抗)))
  *
  (100%+0% or 50%(クリティカル時))
  ＋
  (クリティカル攻撃力(クリティカル時))+(追加属性攻撃)+(追加種族ダメージ))
  ×
  (100%+T1)×(100%+属性相性)×(100%+タイプ相性)×(100%+スキル強化特性)
  ＋
  固定追加ダメージ

  <input type="text" id="en_level" class="" placeholder="モンスターレベル">
  <input type="text" id="en_deffence" class="" placeholder="モンスター防御力">
  <input type="text" id="character_level" class="" placeholder="キャラクターレベル">
  <input type="text" id="skill_power" class="" placeholder="スキル威力">
  <input type="text" id="character_attack" class="" placeholder="キャラクター攻撃力">
  <input type="text" id="attribute_attack" class="" placeholder="属性攻撃力">
  <input type="text" id="tribe_attack" class="" placeholder="種族ダメージ">
  <input type="text" id="property_attack" class="" placeholder="特性">
  <input type="text" id="fix_attack" class="" placeholder="固定追加ダメージ">
  <input type="text" id="ph_critical_attack" class="" placeholder="クリティカル攻撃力">
  <input type="text" id="ma_amplify" class="" placeholder="魔法増幅">
  */
});