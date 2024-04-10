import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
import { Buffer } from 'buffer';
import { PassThrough } from 'stream';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get('Teste')
  async teste(): Promise<any> {
    return new Promise((resolve, reject) => {
        
      const speechConfig = sdk.SpeechConfig.fromSubscription('cebaabaa9b7845f6aa1e4f00044d387b', 'eastus2');
      speechConfig.speechSynthesisOutputFormat = 5; // mp3
      
      let audioConfig = null;
      let filename = 'src/teste.mp3';
      // if (filename) {
      //     audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
      // }
      
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

      synthesizer.speakTextAsync(
          'teste',
          result => {
              
              const { audioData } = result;

              synthesizer.close();

                                
                  // return stream from memory
            // resolve(audioData)
              
              // if (filename) {
                  fs.writeFileSync(filename, Buffer.from(audioData))
                  
              //     // return stream from file
                  const audioFile = fs.createReadStream(filename);
                  audioFile.on('data', (data: any) => {
                    resolve(data)
                  })
                  // resolve(audioFile);
                  
              // } else {
                  
              //     // return stream from memory
              //     const bufferStream = new PassThrough();
              //     bufferStream.end(Buffer.from(audioData));
              //     resolve(bufferStream);
              // }
          },
          error => {
              synthesizer.close();
              reject(error);
          }); 
  });
  }
}