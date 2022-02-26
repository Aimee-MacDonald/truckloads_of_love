const { expect } = require('chai')

describe('Truckloads of Love', () => {
  let signers, tol

  beforeEach(async () => {
    signers = await ethers.getSigners()

    const TOL = await ethers.getContractFactory('TOL')
    tol = await TOL.deploy()
  })

  describe('Minting', () => {
    it('Should mint a new NFT to the recipient', async () => {
      expect(await tol.balanceOf(signers[0].address)).to.equal(0)
  
      await tol.mint(signers[0].address)
  
      expect(await tol.balanceOf(signers[0].address)).to.equal(1)
    })
  
    it('Should only be minted by Owner', async () => {
      expect(await tol.balanceOf(signers[1].address)).to.equal(0)
  
      expect(tol.connect(signers[1]).mint(signers[1].address)).to.be.revertedWith('Ownable: caller is not the owner')
  
      expect(await tol.balanceOf(signers[1].address)).to.equal(0)
    })
  })

  describe('Metadata', () => {
    beforeEach(async () => {
      await tol.mint(signers[0].address)
    })

    it('Should set the metadata', async () => {
      expect(await tol.tokenURI(0)).to.equal('')
      
      await tol.setTokenURI(0, 'Token URL')
      
      expect(await tol.tokenURI(0)).to.equal('Token URL')
    })

    it('Should only be set by Owner', async () => {
      expect(await tol.tokenURI(0)).to.equal('')
      
      expect(tol.connect(signers[1]).setTokenURI(0, 'Token URL')).to.be.revertedWith('Ownable: caller is not the owner')
      
      expect(await tol.tokenURI(0)).to.equal('')
    })
  })
})