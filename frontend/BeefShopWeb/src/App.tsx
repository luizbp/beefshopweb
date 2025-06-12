import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Container, MantineProvider, Paper, Tabs } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { MeatManagement } from './features/MeatManagement'
import { IconMeat, IconTruck, IconUsers } from '@tabler/icons-react';
import { BuyersManagement } from './features/BuyersManagement';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <Notifications position="top-right" />
      <Container size="lg" py="xl">
        <Paper withBorder shadow="md" p="xl" radius="md">
          <Tabs defaultValue="meatManagement">
            <Tabs.List>
              <Tabs.Tab value="meatManagement" leftSection={<IconMeat size={12} />}>
                Carnes
              </Tabs.Tab>
              <Tabs.Tab value="buyers" leftSection={<IconUsers size={12} />}>
                Compradores
              </Tabs.Tab>
              <Tabs.Tab value="orders" leftSection={<IconTruck size={12} />}>
                Pedidos
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="meatManagement">
              <MeatManagement />
            </Tabs.Panel>

            <Tabs.Panel value="buyers">
              <BuyersManagement />
            </Tabs.Panel>

            <Tabs.Panel value="orders">
              Settings tab content
            </Tabs.Panel>
          </Tabs>  
        </Paper>
      </Container>
    </MantineProvider>
  </StrictMode>
)
