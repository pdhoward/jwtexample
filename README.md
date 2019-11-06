# JWT - Example

## Set Up

```
git clone https://github.com/pdhoward/jwtexample.git

```

## Project setup
```
yarn install
```

### Key notes and document

The bcrypt hashing function allows us to build a password security platform that scales with computation power and always hashes every password with a salt.

Storing passwords in plaintext must never be an option. Instead, we want to provide a one-way road to security by hashing passwords. However, hashing alone is not sufficient to mitigate more involved attacks such as rainbow tables. A better way to store passwords is to add a salt to the hashing process: adding additional random data to the input of a hashing function that makes each password hash unique. The ideal authentication platform would integrate these two processes, hashing and salting, seamlessly.

There are plenty of cryptographic functions to choose from such as the SHA2 family and the SHA-3 family. However, one design problem with the SHA families is that they were designed to be computationally fast. How fast a cryptographic function can calculate a hash has an immediate and significant bearing on how safe the password is.

Faster calculations mean faster brute-force attacks, for example. Modern hardware in the form of CPUs and GPUs could compute millions, or even billions, of SHA-256 hashes per second. Instead of a fast function, we need a function that is slow at hashing passwords to bring attackers almost to a halt. We also want this function to be adaptive so that we can compensate for future faster hardware by being able to make the function run slower and slower over time.

Bcrypt by design is slow hashing, to frustrate an attack using a full dictionary of potential passwords

Based on OWASP recommendations:

* Perform UX research to find what are acceptable user wait times for registration and authentication.
* If the accepted wait time is 1 second, tune the cost of bcrypt for it to run in 1 second on your hardware.
* Analyze with your security team if the computation time is enough to mitigate and slow down attacks.
* Users may be fine waiting for 1 or 2 seconds as they don't have to consistently authenticate. The process could still be perceived as quick. Whereas, this delay would frustrate the efforts of an attacker to quickly compute a rainbow table.

bcrypt.compare deduces the salt from the hash and is able to then hash the provided password correctly for comparison.



