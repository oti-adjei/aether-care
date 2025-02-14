const crypto = require('crypto');
import fetch from 'node-fetch'; // Or axios
import Logger from '../../../../config/logger';
import { ActionableStepsRepository } from '../../actionable_steps/repository';

const _logger = new Logger('Notes Helper');



export class Notes {
    static readonly algorithm = 'aes-256-cbc'; // Choose an appropriate algorithm
    static readonly key = process.env.ENCRYPTION_KEY; // Read key from environment variable (32 bytes = 256 bits)

// Function to encrypt text
static encrypt(text: any) {


if (!Notes.key) {
    throw new Error('ENCRYPTION_KEY environment variable is not set');
  }
  const iv = crypto.randomBytes(16); // Generate a unique IV (16 bytes = 128 bits for AES)
  const cipher = crypto.createCipheriv(Notes.algorithm, Buffer.from(Notes.key, 'hex'), iv); // Use hex for key
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString('hex'), // Store IV as hex
    encryptedData: encrypted.toString('hex'), // Store encrypted data as hex
  };
}

// Function to decrypt text
static decrypt(encryptedData: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }, iv: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }) {
    if (!Notes.key) {
        throw new Error('ENCRYPTION_KEY environment variable is not set');
      }
  const ivBuffer = Buffer.from(iv, 'hex'); // Get IV from hex
  const encryptedText = Buffer.from(encryptedData, 'hex'); // Get encrypted text from hex

  const decipher = crypto.createDecipheriv(Notes.algorithm, Buffer.from(Notes.key, 'hex'), ivBuffer);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
}

// Example Usage
// Set the environment variable ENCRYPTION_KEY
// ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

// Encrypt
// const encryptedData = encrypt("This is the doctor's sensitive note!");
// console.log('Encrypted Data:', encryptedData);

// Decrypt
// const decryptedText = decrypt(encryptedData.encryptedData, encryptedData.iv);
// console.log('Decrypted Text:', decryptedText);




const llmApiKey = process.env.LLM_API_KEY; // Get API key from env

if (!llmApiKey) {
  _logger.error('LLM API key is missing. Set the LLM_API_KEY environment variable.');
  throw new Error('LLM API key is missing');
}

interface LLMResponse {
  checklist: { description: string; }[];
  plan: { description: string; due_date: string | null; }[];
}

async function extractActionableSteps(noteText: string, apiKey: string): Promise<LLMResponse> {
  const apiUrl = 'YOUR_LLM_API_ENDPOINT'; // Replace with the actual API endpoint
  const prompt = `
    Analyze the following doctor's note and extract actionable steps for the patient.

    Doctor's Note:
    ${noteText}

    Output the actionable steps in JSON format with two keys: "checklist" (immediate, one-time tasks) and "plan" (scheduled, recurring actions). Each item in the checklist and plan should have a "description" and optionally a "due_date" (for plan items). If there is no due date mention 'null' or 'asap'

    Example Output:
    {
      "checklist": [
        {"description": "Buy Amoxicillin 250mg" },
        {"description": "Schedule a follow-up appointment with a cardiologist" }
      ],
      "plan": [
        {"description": "Take Amoxicillin 250mg three times a day", "due_date": "daily for 7 days" },
        {"description": "Monitor blood pressure twice daily", "due_date": "daily for 14 days" }
      ]
    }
  `;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // Or however the LLM API requires authentication
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as LLMResponse;
  } catch (error) {
    _logger.error('Error calling LLM API:', error);
    throw error; // Re-throw the error for handling upstream
  }
}

export { extractActionableSteps, LLMResponse };



async function cancelExistingActionableSteps(patientId: string): Promise<void> {
  try {
    await ActionableStepsRepository.cancelActionableStepsByPatientId(patientId); // Call a new function from ActionableStepRepository
    _logger.log(`Successfully cancelled existing actionable steps for patient ${patientId}`);
  } catch (error) {
    _logger.error('Error canceling actionable steps:', error);
    throw error; // Re-throw the error for handling upstream
  }
}

export { cancelExistingActionableSteps };