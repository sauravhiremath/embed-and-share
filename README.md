![Embed and Share](https://user-images.githubusercontent.com/28642011/108596462-3d4d2580-73ab-11eb-94a5-1ffad426b503.png)

## About Embed and Share

- Plagiarised data everywhere. No way to ensure which content belongs to whom. Be it a content creator, a musician, a business tycoon, a student, etc.
- Sign your documents and data in the most secure way using your typing pattern.
- Only you can verify and change the content, using your unique typing DNA.
- Be it music files, pdfs, photos, 3D files, .cad files - We handle it all
- Provides 3 layer security for your documents
  - typingDNA pattern
  - RSA encryption
  - sha512 file integrity verification

## How we built it

- Using React and NodeJS.
- Modifies zip metadata for embedding the typing pattern and userId inside it.
- Maintains the sha verification file for data integrity
- Deployed on google cloud

## Challenges we ran into

- Ran into minor but many issues, but a huge huge shoutout to **Adrian Poaca** for the last moment help with the typingDNA API issues. You are a truly awesome person!
- Scaling
  ![image](https://user-images.githubusercontent.com/28642011/108463517-8a929f80-72a4-11eb-9575-482516729f93.png)

## Architecture

### Signature process

![Signature process Architecture](https://user-images.githubusercontent.com/28642011/108404822-5092b080-7246-11eb-94d7-6d9b912dafa6.png)

### Verification process

![Verification process Architecture](https://user-images.githubusercontent.com/28642011/108404863-5d170900-7246-11eb-9d20-9dd3dece1c93.png)

## Why is this product different?

| STRENGTH            | REASONING                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| Unique Embed Design | It gets embedded with the documents of ANY type to protect its integrity using the sha512 algorithm |
| Security            | Adds a digital signature over your data. If someone changes the data - the signature won't be valid |
| More Security       | Allows the user to add a password protection layer, if they want it more secure                     |
| Plagiarism          | Easy validation of your content will help reduce data copying and modification                      |
| Data privacy        | Well it's a feature of typingDNA, not our proprietary feature. But still, we uphold it              |
