import type { Page } from '@playwright/test';
import path from 'path';

export const uploadAttachment = async (page: Page, fileName: string) => {
  const filePath = path.resolve(__dirname, '../data', fileName);
  const fileInput = page.locator('input[type="file"].oxd-file-input');
  await fileInput.setInputFiles(filePath);
};
