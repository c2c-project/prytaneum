import time
import random
from locust import HttpUser, task, between
from faker import Faker

fake = Faker()

LOGIN_MUTATION = "mutation LoginFormMutation (\n  $input: LoginForm!\n) {\n  login(input: $input) {\n    isError\n    message\n    body {\n      ...useUserFragment\n      id\n    }\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n}"
REGISTER_MUTATION = "mutation RegisterFormMutation(\n  $input: RegistrationForm!\n) {\n  register(input: $input) {\n    isError\n    message\n    body {\n      ...useUserFragment\n      id\n    }\n  }\n}\n\nfragment useUserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  avatar\n}\n"
LOGOUT_MUTATION = "mutation logoutMutation {\n logout \n}\n"
ASK_QUESTION_MUTATION = "mutation AskQuestionMutation(\n  $input: CreateQuestion!\n) {\n  createQuestion(input: $input) {\n    isError\n    message\n    body {\n      cursor\n      node {\n        id\n        createdAt\n        question\n        createdBy {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n}\n"
VALID_ACCOUNTS = ["a@a.com", "b@b.com"]
EVENT_ID = "RXZlbnQ6NzViY2RiNDUtY2YwMC00MWUxLTgyYTUtNTJiOTYyYzEzMzky"

class QuickstartUser(HttpUser):
    wait_time = between(10, 90)

    @task
    def ask_question(self):
        response = self.client.post("/graphql", json={ "query": ASK_QUESTION_MUTATION, "variables": { "input": { "question": fake.text(max_nb_chars=100), "eventId": EVENT_ID }}})
        print("Question Ask Response: ", response.text)

    # Triggers when a new http user instance is spawned
    def on_start(self):
        self.client.get("/")
        self.client.get("/login")
        self.client.post("/graphql", json={ "query": LOGIN_MUTATION, "variables": { "input": { "email": random.choice(VALID_ACCOUNTS), "password": "1" } } })
        self.client.get("/events/" + EVENT_ID + "/live")

    # Triggers when the load testing is stopped
    def on_stop(self):
        response = self.client.post("/graphql", json={ "query": LOGOUT_MUTATION, "variables": {} })
        print("Logout Response: ", response.text)
