import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import os

#Paths
DATA_PATH = os.path.join('.','data')
ORIGINAL_PATH = os.path.join(DATA_PATH, 'Walmart_sales.csv')
#Read
df= pd.read_csv(ORIGINAL_PATH)
#Relevant cols
df = df[['Store','Date', 'Weekly_Sales']].copy()
df['Date'] = pd.to_datetime(df['Date'], format = "%d-%m-%Y")

df['Month'] = df['Date'].dt.month
df['Year'] = df['Date'].dt.year
df['month_name'] = df['Date'].dt.month_name()



unique_stores = df['Store'].unique()

store_dataframes = {}
for store in unique_stores:

    store_df = df[df['Store'] == store]

    monthly_sales = pd.pivot_table(store_df, values = "Weekly_Sales", columns = "Year", index = "Month")
    OUTPUT_FILE = os.path.join(DATA_PATH, 'walmart_simple_store_N_'+str(store)+'.xlsx')
    monthly_sales.to_csv(OUTPUT_FILE,index=False,header = True)

#reset dataFrame
monthly_sales = pd.pivot_table(df, values = "Weekly_Sales", columns = "Year", index = "Month")


print(monthly_sales)
monthly_sales.plot()

plt.xlabel('Month', fontsize=14)
plt.ylabel('Weekly Sales', fontsize=14,)
plt.title('Weekly Sales by Month', fontsize=16)

# Enhancing the plot
plt.xticks(rotation=45, fontsize=10)
plt.yticks(fontsize=10)
plt.tight_layout()
plt.show()

OUTPUT_FILE = os.path.join(DATA_PATH, 'walmart_simple.xlsx')
monthly_sales.to_csv(OUTPUT_FILE,index=False,header = True)