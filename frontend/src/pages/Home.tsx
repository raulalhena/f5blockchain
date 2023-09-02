import React from 'react'
import DenseAppBar from '../components/Navbar'

function Home() {
  return (
    <>
      <DenseAppBar />
      <div style={{position: 'aboslute', top: '25%', left: '15%', width: '70%', height: '50%', paddingTop: '40%', paddingBottom: '0', 
      boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)', marginTop: '1.6em', marginBottom: '0.9em', overflow: 'hidden', 
      borderRadius: '8px', willChange: 'transform' }}>
        <iframe loading="lazy" style={{ position: 'absolute', width: '70%', height: '70%', top: '10%', left: '15%', border: 'none', padding: '0', margin: '0'}}
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFsXUVZx8g&#x2F;view?embed" allowFullscreen="allowfullscreen" allow="fullscreen">
        </iframe>
        <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFsXUVZx8g&#x2F;view?utm_content=DAFsXUVZx8g&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" 
      target="_blank" rel="noopener">Tecnología Blockchain</a> de Raúl Alhena
      </div>
    </>
    
  )
}

export default Home