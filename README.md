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

