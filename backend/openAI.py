from openai import OpenAI
 
client = OpenAI(
  api_key="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"
)
 
completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)
 
print(completion.choices[0].message);