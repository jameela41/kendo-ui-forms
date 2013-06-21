describe('Kendo Forms Widget Test Suite', function() {
  describe('Form initialization tests', function() {
		var fixtures = jasmine.getFixtures(),
			base = "../";
		
		if (document.location.pathname === "/context.html") {
			// Karma is running the test, so change the base
			base = "base/";
		}
		fixtures.fixturesPath = base + 'spec/javascripts/fixtures';
				
		describe('Form Widget initialization', function() {
			it('should exist in the kendo.ui namespace', function() {
				expect(kendo.ui.Form).toBeDefined();
			});

			it('should be able to perform imperative initialization with JavaScript', function() {
				expect($('#imperative-form').kendoForm).toBeDefined();
			});

			it('should be able to perform declarative initialization with data attributes', function() {
				fixtures.load('form-init.html');
			
				kendo.init(document.body);

				expect(typeof $('#declarative-form').data('kendoForm')).toEqual("object");
			});
		});
		
		describe('Input transformation', function() {
			it('should add the k-input class to all inputs inside of the form', function() {
				fixtures.load('form-init.html');
			
				$('#imperative-form').kendoForm();
				expect($('#imperative-form').find('#vanillaInput').hasClass('k-input')).toBe(true);
			});

			it('should add the k-input class to inputs inside of the form if the styleInputs option is true', function() {
				fixtures.load('form-init.html');
			
				$('#imperative-form').kendoForm({ styleInputs: true });
				expect($('#imperative-form').find('#vanillaInput').hasClass('k-input')).toBe(true);
			});

			it('should NOT add the k-input class to inputs inside of the form if the styleInputs option is false', function() {
				fixtures.load('form-init.html');
			
				$('#imperative-form').kendoForm({ styleInputs: false });
				expect($('#imperative-form').find('#vanillaInput').hasClass('k-input')).toBe(false);
			});
		});

		describe('Color type support', function() {
			if (!kendo.forms.features.color) {
				it('should create a kendoColorPicker from the color input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect(typeof $('#color').data('kendoColorPicker')).toEqual("object");
				});
			} else {
				it('should NOT create a kendoColorPicker if the color type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect(typeof $('#color').data('kendoColorPicker')).toEqual('undefined');
				});

				it('should create a colorpicker on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect(typeof $('#color').data('kendoColorPicker')).toEqual("object");
				});
			}			
		});

		describe('Number type support', function() {
			if (!kendo.forms.features.number) {
				it('should create a kendoNumericTextBox from the number input type', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect(typeof $('#numeric').data('kendoNumericTextBox')).toEqual("object");
				});
			} else {
				it('should NOT create a kendoNumericTextBox if the number type is already supported by the browser', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm();
					expect(typeof $('#numeric').data('kendoNumericTextBox')).toEqual('undefined');
				});

				it('should create a colorpicker on ALL browsers if the alwaysUseWidgets option is passed-in', function() {
					fixtures.load('form-init.html');

					$('#imperative-form').kendoForm({ alwaysUseWidgets: true });
					expect(typeof $('#numeric').data('kendoNumericTextBox')).toEqual("object");
				});
			}

			it('should expose number type attributes as values in the kendoNumericTextBox widget', function() {
				fixtures.load('form-init.html');

				$('#imperative-form').kendoForm({ alwaysUseWidgets: true });

				var numericInput = $('#numeric');
				var ntbObject = numericInput.data('kendoNumericTextBox');

				// Test each value we set via attribute and make sure the value was 
				// preserved in the NumericTextBox
				expect(ntbObject.value().toString()).toEqual(numericInput.val());
				expect(ntbObject.min().toString()).toEqual(numericInput.attr('min'));
				expect(ntbObject.max().toString()).toEqual(numericInput.attr('max'));
				expect(ntbObject.step().toString()).toEqual(numericInput.attr('step'));
			});
		});
		
		fixtures.cleanUp();
		fixtures.clearCache();
	});
});