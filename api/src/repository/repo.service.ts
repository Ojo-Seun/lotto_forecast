import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BINGO } from './schemas/bingo.schema'
import { Model } from 'mongoose'
import { BONANZA } from './schemas/bonanza.schema'
import { CLUB_MASTER } from './schemas/club-master.schema'
import { DIAMOND } from './schemas/diamond.schema'
import { ENUGU } from './schemas/enugu.schema'
import { FAIR_CHANCE } from './schemas/fairchance.schema'
import { FORTUNE } from './schemas/fortune.schema'
import { GOLD } from './schemas/gold.schema'
import { INTERNATIONAL } from './schemas/international.schema'
import { JACKPOT } from './schemas/jackpot.schema'
import { KING } from './schemas/king.schema'
import { LUCKY_G } from './schemas/lucky-g.schema'
import { LUCKY } from './schemas/lucky.schema'
import { MARK_II } from './schemas/mark-II.schema'
import { METRO } from './schemas/metro.schema'
import { MID_WEEK } from './schemas/mid-week.schema'
import { MSP } from './schemas/msp.schema'
import { NATIONAL } from './schemas/national.schema'
import { O6 } from './schemas/o6.schema'
import { PEOPLES } from './schemas/peoples.schema'
import { ROYAL } from './schemas/royal.schema'
import { SUPER } from './schemas/super.schema'
import { TOTA } from './schemas/tota.schema'
import { VAG } from './schemas/vag.schema'
import { Games } from '../games/interface/types'
import { GAMEYEARS } from './schemas/years.schema'

@Injectable()
export class RepoService {
  private ghanaModels: (typeof Model)[]
  private premmierModels: (typeof Model)[]
  private allmodels: Map<Games, typeof Model>
  constructor(
    @InjectModel(BINGO.name) private readonly BINGOModel: Model<BINGO>,
    @InjectModel(BONANZA.name) private readonly BONANZAModel: Model<BONANZA>,
    @InjectModel(CLUB_MASTER.name) private readonly CLUB_MASTERModel: Model<CLUB_MASTER>,
    @InjectModel(DIAMOND.name) private readonly DIAMONDModel: Model<DIAMOND>,
    @InjectModel(ENUGU.name) private readonly ENUGUModel: Model<ENUGU>,
    @InjectModel(FAIR_CHANCE.name) private readonly FAIR_CHANCEModel: Model<FAIR_CHANCE>,
    @InjectModel(FORTUNE.name) private readonly FORTUNEModel: Model<FORTUNE>,
    @InjectModel(GOLD.name) private readonly GOLDModel: Model<GOLD>,
    @InjectModel(INTERNATIONAL.name) private readonly INTERNATIONALModel: Model<INTERNATIONAL>,
    @InjectModel(JACKPOT.name) private readonly JACKPOTModel: Model<JACKPOT>,
    @InjectModel(KING.name) private readonly KINGModel: Model<KING>,
    @InjectModel(LUCKY_G.name) private readonly LUCKY_GModel: Model<LUCKY_G>,
    @InjectModel(LUCKY.name) private readonly LUCKYModel: Model<LUCKY>,
    @InjectModel(MARK_II.name) private readonly MARK_IIModel: Model<MARK_II>,
    @InjectModel(METRO.name) private readonly METROModel: Model<METRO>,
    @InjectModel(MID_WEEK.name) private readonly MID_WEEKModel: Model<MID_WEEK>,
    @InjectModel(MSP.name) private readonly MSPModel: Model<MSP>,
    @InjectModel(NATIONAL.name) private readonly NATIONALModel: Model<NATIONAL>,
    @InjectModel(O6.name) private readonly O6Model: Model<O6>,
    @InjectModel(PEOPLES.name) private readonly PEOPLESModel: Model<PEOPLES>,
    @InjectModel(ROYAL.name) private readonly ROYALModel: Model<ROYAL>,
    @InjectModel(SUPER.name) private readonly SUPERModel: Model<SUPER>,
    @InjectModel(TOTA.name) private readonly TOTAModel: Model<TOTA>,
    @InjectModel(VAG.name) private readonly VAGModel: Model<VAG>,
    @InjectModel(GAMEYEARS.name) private readonly GAMEYEARSMODEL: Model<GAMEYEARS>,
  ) {
    this.ghanaModels = [NATIONALModel, BONANZAModel, LUCKY_GModel, MID_WEEKModel, FORTUNEModel, MSPModel]
    this.premmierModels = [BINGOModel, CLUB_MASTERModel, DIAMONDModel, ENUGUModel, FAIR_CHANCEModel, GOLDModel, INTERNATIONALModel, JACKPOTModel, KINGModel, LUCKYModel, MARK_IIModel, METROModel, O6Model, PEOPLESModel, ROYALModel, SUPERModel, TOTAModel, VAGModel]
    // Add validation middleware to  each game model
    const validate = (event: number[]) => {
      if (event.length !== 5) return false
      for (let i = 0; i < event.length; i++) {
        const element = event[i]
        const isValid = element >= 0 && element <= 90
        if (isValid) {
          return true
        }
        return false
      }
    }
    const validateNextedDoc = () => {
      const allmodelsArr = [...this.ghanaModels, ...this.premmierModels]
      allmodelsArr.forEach((model) => {
        // Validate Winning field
        model.schema.path('Winning').validate(validate)
        // Validate Machine field
        model.schema.path('Machine').validate(validate)
      })
    }
    validateNextedDoc()
    this.allmodels = new Map([
      ['NATIONAL', NATIONALModel],
      ['BINGO', BINGOModel],
      ['BONANZA', BONANZAModel],
      ['CLUB MASTER', CLUB_MASTERModel],
      ['DIAMOND', DIAMONDModel],
      ['ENUGU', ENUGUModel],
      ['FAIR CHANCE', FAIR_CHANCEModel],
      ['FORTUNE', FORTUNEModel],
      ['GOLD', GOLDModel],
      ['INTERNATIONAL', INTERNATIONALModel],
      ['JACKPOT', JACKPOTModel],
      ['KING', KINGModel],
      ['LUCKY G', LUCKY_GModel],
      ['MARK-II', MARK_IIModel],
      ['METRO', METROModel],
      ['MID WEEK', MID_WEEKModel],
      ['MSP', MSPModel],
      ['O6', O6Model],
      ['PEOPLES', PEOPLESModel],
      ['LUCKY', LUCKYModel],
      ['ROYAL', ROYALModel],
      ['SUPER', SUPERModel],
      ['TOTA', TOTAModel],
      ['VAG', VAGModel],
    ])
  }

  getModel(game: Games) {
    const model = this.allmodels.get(game)

    if (model === undefined) {
      throw new NotFoundException('model not found, is the name provided?')
    }
    return model
  }

  getGameYearsModel(): Model<GAMEYEARS> {
    return this.GAMEYEARSMODEL
  }
}
