// set-date-direct.js
import { test, expect } from '@playwright/test';

test('set date directly on input', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');

 // adjust selector & date format to your app. Many date inputs use YYYY-MM-DD.
  const selector = "input[name='bday']";                      
  const valueToSet = '2025-10-10';                        

  await page.evaluate(({ selector, value }) => {
    const el = document.querySelector(selector);
    if (!el) throw new  Error('Date input not found: ' + selector);
    el.value = value;
    // dispatch events so frameworks update their state
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, { selector, value: valueToSet });

  // verify UI or app state updated
  await expect(page.locator(selector)).toHaveValue(valueToSet);
  
  const submit = page.getByRole('Button',{name:"Submit"});
   await submit.click();
   
});
